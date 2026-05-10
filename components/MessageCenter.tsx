"use client";

import { Mail, Plus, Send, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  author: "client" | "workshop";
  body: string;
  createdAt: string;
};

type Conversation = {
  id: string;
  title: string;
  clientEmail: string;
  clientName: string;
  createdAt: string;
  messages: ChatMessage[];
};

type MessageCenterProps = {
  isOwner?: boolean;
  userEmail?: string | null;
  userName?: string | null;
};

type ConversationStore = Record<string, Conversation[]>;

const GLOBAL_STORAGE_KEY = "carpinteria-conversations-by-user";
const ACTIVE_CHAT_KEY = "carpinteria-active-chat";
const LEGACY_STORAGE_KEY = "carpinteria-conversations";
const LEGACY_THREAD_KEY = "carpinteria-message-thread";
const INITIAL_CREATED_AT = "2026-05-08T00:00:00.000Z";
const EMPTY_MESSAGES: ChatMessage[] = [];

function normalizeEmail(email?: string | null) {
  return (email ?? "invitado@local").trim().toLowerCase();
}

function getDisplayName(name?: string | null, email?: string | null) {
  return name?.trim() || email || "Cliente";
}

function createStarterMessage(createdAt: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    author: "workshop",
    body: "Estamos encantadas de ayudarle con su proyecto. Cuentenos por aqui y lo veremos desde el taller.",
    createdAt,
  };
}

function createConversation({
  title,
  clientEmail,
  clientName,
  createdAt = new Date().toISOString(),
}: {
  title: string;
  clientEmail: string;
  clientName: string;
  createdAt?: string;
}): Conversation {
  return {
    id: crypto.randomUUID(),
    title,
    clientEmail,
    clientName,
    createdAt,
    messages: [createStarterMessage(createdAt)],
  };
}

function getFallbackConversation(userEmail: string, userName: string) {
  return createConversation({
    title: "Proyecto 1",
    clientEmail: userEmail,
    clientName: userName,
    createdAt: INITIAL_CREATED_AT,
  });
}

function readConversationStore() {
  const savedStore = window.localStorage.getItem(GLOBAL_STORAGE_KEY);

  if (!savedStore) {
    return {};
  }

  try {
    return JSON.parse(savedStore) as ConversationStore;
  } catch {
    return {};
  }
}

function writeConversationStore(store: ConversationStore) {
  window.localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(store));
}

function migrateLegacyConversations(userEmail: string, userName: string) {
  const savedConversations = window.localStorage.getItem(LEGACY_STORAGE_KEY);

  if (savedConversations) {
    try {
      const legacyConversations = JSON.parse(savedConversations) as Array<
        Partial<Conversation>
      >;

      return legacyConversations.map((conversation, index) => ({
        id: conversation.id ?? crypto.randomUUID(),
        title: conversation.title ?? `Proyecto ${index + 1}`,
        clientEmail: userEmail,
        clientName: userName,
        createdAt: conversation.createdAt ?? new Date().toISOString(),
        messages: conversation.messages ?? [],
      }));
    } catch {
      return [getFallbackConversation(userEmail, userName)];
    }
  }

  const legacyThread = window.localStorage.getItem(LEGACY_THREAD_KEY);

  if (legacyThread) {
    try {
      const messages = JSON.parse(legacyThread) as ChatMessage[];

      return [
        {
          id: crypto.randomUUID(),
          title: "Proyecto 1",
          clientEmail: userEmail,
          clientName: userName,
          createdAt: messages[0]?.createdAt ?? new Date().toISOString(),
          messages,
        },
      ];
    } catch {
      return [getFallbackConversation(userEmail, userName)];
    }
  }

  return [getFallbackConversation(userEmail, userName)];
}

function getConversationsForUser(userEmail: string, userName: string) {
  const store = readConversationStore();
  const savedConversations = store[userEmail];

  if (savedConversations?.length) {
    return savedConversations;
  }

  const migratedConversations = migrateLegacyConversations(userEmail, userName);
  writeConversationStore({
    ...store,
    [userEmail]: migratedConversations,
  });

  return migratedConversations;
}

function getOwnerConversations() {
  const store = readConversationStore();

  return Object.values(store)
    .flat()
    .sort((first, second) => {
      const firstDate = getLastMessage(first)?.createdAt ?? first.createdAt;
      const secondDate = getLastMessage(second)?.createdAt ?? second.createdAt;

      return new Date(secondDate).getTime() - new Date(firstDate).getTime();
    });
}

function getActiveChatKey(userEmail: string, isOwner: boolean) {
  return `${ACTIVE_CHAT_KEY}:${isOwner ? "owner" : userEmail}`;
}

function getInitialActiveChatId(
  conversations: Conversation[],
  userEmail: string,
  isOwner: boolean,
) {
  const savedActiveChat = window.localStorage.getItem(
    getActiveChatKey(userEmail, isOwner),
  );
  const activeChatExists = conversations.some(
    (conversation) => conversation.id === savedActiveChat,
  );

  return activeChatExists ? savedActiveChat ?? "" : conversations[0]?.id ?? "";
}

function getInitialChatState(
  userEmail: string,
  userName: string,
  isOwner: boolean,
) {
  const conversations = isOwner
    ? getOwnerConversations()
    : getConversationsForUser(userEmail, userName);

  return {
    conversations,
    activeChatId: getInitialActiveChatId(conversations, userEmail, isOwner),
  };
}

function getServerSafeChatState(userEmail: string, userName: string) {
  const fallbackConversation = getFallbackConversation(userEmail, userName);

  return {
    conversations: [fallbackConversation],
    activeChatId: fallbackConversation.id,
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function buildTranscript(messages: ChatMessage[]) {
  return messages
    .map((message) => {
      const author = message.author === "client" ? "Cliente" : "Taller";
      return `${author} (${formatDate(message.createdAt)}):\n${message.body}`;
    })
    .join("\n\n");
}

function getLastMessage(conversation: Conversation) {
  return conversation.messages[conversation.messages.length - 1];
}

function saveClientConversations(userEmail: string, conversations: Conversation[]) {
  const store = readConversationStore();

  writeConversationStore({
    ...store,
    [userEmail]: conversations,
  });
}

function saveOwnerConversation(updatedConversation: Conversation) {
  const store = readConversationStore();
  const clientEmail = normalizeEmail(updatedConversation.clientEmail);
  const clientConversations = store[clientEmail] ?? [];
  const nextConversations = clientConversations.map((conversation) =>
    conversation.id === updatedConversation.id ? updatedConversation : conversation,
  );
  const conversationExists = nextConversations.some(
    (conversation) => conversation.id === updatedConversation.id,
  );

  writeConversationStore({
    ...store,
    [clientEmail]: conversationExists
      ? nextConversations
      : [updatedConversation, ...clientConversations],
  });
}

function deleteConversationFromStore(conversationToDelete: Conversation) {
  const store = readConversationStore();
  const clientEmail = normalizeEmail(conversationToDelete.clientEmail);

  writeConversationStore({
    ...store,
    [clientEmail]: (store[clientEmail] ?? []).filter(
      (conversation) => conversation.id !== conversationToDelete.id,
    ),
  });
}

export function MessageCenter({
  isOwner = false,
  userEmail: userEmailProp,
  userName: userNameProp,
}: MessageCenterProps) {
  const userEmail = normalizeEmail(userEmailProp);
  const userName = getDisplayName(userNameProp, userEmailProp);
  const [chatState, setChatState] = useState(() =>
    getServerSafeChatState(userEmail, userName),
  );
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState("");
  const [hasLoadedSavedChats, setHasLoadedSavedChats] = useState(false);
  const messageScrollRef = useRef<HTMLDivElement>(null);

  const { activeChatId, conversations } = chatState;
  const activeConversation =
    conversations.find((conversation) => conversation.id === activeChatId) ??
    conversations[0];
  const messages = activeConversation?.messages ?? EMPTY_MESSAGES;
  const hasConversations = conversations.length > 0;

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) {
        return;
      }

      setChatState(getInitialChatState(userEmail, userName, isOwner));
      setHasLoadedSavedChats(true);
    });

    return () => {
      isActive = false;
    };
  }, [isOwner, userEmail, userName]);

  useEffect(() => {
    if (!hasLoadedSavedChats) {
      return;
    }

    if (!isOwner) {
      saveClientConversations(userEmail, conversations);
    }
  }, [conversations, hasLoadedSavedChats, isOwner, userEmail]);

  useEffect(() => {
    if (!hasLoadedSavedChats) {
      return;
    }

    window.localStorage.setItem(
      getActiveChatKey(userEmail, isOwner),
      activeChatId,
    );
  }, [activeChatId, hasLoadedSavedChats, isOwner, userEmail]);

  useEffect(() => {
    const scrollElement = messageScrollRef.current;

    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [activeChatId, messages.length]);

  const mailtoHref = useMemo(() => {
    const recipient = isOwner
      ? activeConversation?.clientEmail ?? ""
      : userEmail;
    const subject = `Copia de la conversacion: ${
      activeConversation?.title ?? "Proyecto"
    }`;
    const transcript = buildTranscript(messages);
    const intro = "Hola,\n\nTe enviamos una copia de tu conversacion:\n\n";

    return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(`${intro}${transcript}`)}`;
  }, [activeConversation?.clientEmail, activeConversation?.title, isOwner, messages, userEmail]);

  function updateActiveConversation(messagesForChat: ChatMessage[]) {
    if (!activeConversation) {
      return;
    }

    const updatedConversation = {
      ...activeConversation,
      messages: messagesForChat,
    };

    if (isOwner) {
      saveOwnerConversation(updatedConversation);
    }

    setChatState((current) => ({
      ...current,
      conversations: current.conversations.map((conversation) =>
        conversation.id === current.activeChatId
          ? updatedConversation
          : conversation,
      ),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activeConversation) {
      setNotice("No hay ninguna conversacion abierta.");
      return;
    }

    const trimmedBody = body.trim();

    if (trimmedBody.length < 2) {
      setNotice("Escribe un mensaje antes de enviarlo.");
      return;
    }

    const now = new Date().toISOString();
    const nextMessages = [
      ...messages,
      {
        id: crypto.randomUUID(),
        author: isOwner ? ("workshop" as const) : ("client" as const),
        body: trimmedBody,
        createdAt: now,
      },
    ];

    updateActiveConversation(nextMessages);
    setBody("");
    setNotice(isOwner ? "Respuesta enviada." : "Mensaje enviado al taller.");
  }

  function createNewChat() {
    const nextConversation = createConversation({
      title: `Proyecto ${conversations.length + 1}`,
      clientEmail: userEmail,
      clientName: userName,
    });

    setChatState((current) => ({
      conversations: [nextConversation, ...current.conversations],
      activeChatId: nextConversation.id,
    }));
    setBody("");
    setNotice("");
  }

  function deleteActiveChat() {
    if (!activeConversation) {
      return;
    }

    if (isOwner) {
      deleteConversationFromStore(activeConversation);
      const remainingConversations = conversations.filter(
        (conversation) => conversation.id !== activeChatId,
      );

      setChatState({
        conversations: remainingConversations,
        activeChatId: remainingConversations[0]?.id ?? "",
      });
      setNotice("Chat eliminado de la bandeja.");
      return;
    }

    if (conversations.length === 1) {
      const replacement = createConversation({
        title: "Proyecto 1",
        clientEmail: userEmail,
        clientName: userName,
      });
      setChatState({
        conversations: [replacement],
        activeChatId: replacement.id,
      });
      setNotice("Conversacion reiniciada.");
      return;
    }

    const remainingConversations = conversations.filter(
      (conversation) => conversation.id !== activeChatId,
    );

    setChatState({
      conversations: remainingConversations,
      activeChatId: remainingConversations[0]?.id ?? "",
    });
    setNotice("Chat eliminado.");
  }

  return (
    <div className="grid h-[calc(100dvh-12rem)] min-h-[34rem] gap-5 lg:grid-cols-[15rem_1fr]">
      <aside className="flex min-h-0 flex-col rounded-lg border border-background bg-surface p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {isOwner ? "Bandeja" : "Tus mensajes"}
          </h2>
          <button
            type="button"
            aria-label="Eliminar chat abierto"
            onClick={deleteActiveChat}
            disabled={!hasConversations}
            className="inline-flex size-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        {!isOwner ? (
          <button
            type="button"
            onClick={createNewChat}
            className={buttonVariants({
              variant: "secondary",
              className: "mb-3 w-full rounded-full",
            })}
          >
            <Plus className="size-4" />
            Chat nuevo
          </button>
        ) : null}

        <div className="grid min-h-0 flex-1 content-start gap-3 overflow-y-auto pr-1">
          {conversations.map((conversation) => {
            const lastMessage = getLastMessage(conversation);
            const isActive = conversation.id === activeChatId;

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => {
                  setChatState((current) => ({
                    ...current,
                    activeChatId: conversation.id,
                  }));
                  setNotice("");
                }}
                className={cn(
                  "min-h-20 rounded-md border px-3 py-2 text-left text-xs leading-5 transition-colors",
                  isActive
                    ? "border-accent bg-background text-primary"
                    : "border-background bg-background text-primary hover:bg-background",
                )}
              >
                <span className="block font-semibold">
                  {isOwner ? conversation.clientName : conversation.title}
                </span>
                {isOwner ? (
                  <span className="mt-1 block truncate text-muted-foreground">
                    {conversation.clientEmail}
                  </span>
                ) : null}
                <time
                  className="mt-1 block text-muted-foreground"
                  dateTime={lastMessage?.createdAt ?? conversation.createdAt}
                >
                  {formatDate(lastMessage?.createdAt ?? conversation.createdAt)}
                </time>
                <span className="mt-1 block truncate text-muted-foreground">
                  {lastMessage?.author === "client" ? "Cliente" : "Taller"}
                </span>
              </button>
            );
          })}

          {!hasConversations ? (
            <p className="rounded-md border border-background bg-background px-3 py-4 text-sm leading-6 text-primary/70">
              Todavia no hay mensajes de clientes.
            </p>
          ) : null}
        </div>
      </aside>

      <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-secondary bg-surface">
        <div className="relative flex items-center justify-between gap-4 border-b border-secondary px-4 py-3">
          <div>
            <h2 className="font-serif text-2xl font-semibold leading-none text-primary">
              {activeConversation
                ? isOwner
                  ? activeConversation.clientName
                  : activeConversation.title
                : "Sin conversacion"}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {activeConversation
                ? isOwner
                  ? activeConversation.clientEmail
                  : "Taller conectado"
                : "Esperando mensajes"}
            </p>
          </div>

          <a
            href={activeConversation ? mailtoHref : undefined}
            aria-disabled={!activeConversation}
            className={buttonVariants({
              variant: "outline",
              className: "rounded-full px-4",
            })}
          >
            <Mail className="size-4" />
            Enviar copia
          </a>
        </div>

        <div
          ref={messageScrollRef}
          className="min-h-0 flex-1 overflow-y-auto bg-background px-4 py-5"
        >
          <div className="flex min-h-full flex-col justify-end gap-3">
            {messages.map((message) => {
              const isOwnMessage = isOwner
                ? message.author === "workshop"
                : message.author === "client";

              return (
                <article
                  key={message.id}
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm",
                    isOwnMessage
                      ? "ml-auto rounded-br-sm bg-primary text-surface"
                      : "mr-auto rounded-bl-sm border border-secondary bg-background text-primary",
                  )}
                >
                  <p>{message.body}</p>
                  <time
                    className={cn(
                      "mt-1 block text-right text-[0.7rem]",
                      isOwnMessage ? "text-surface" : "text-muted-foreground",
                    )}
                    dateTime={message.createdAt}
                  >
                    {formatDate(message.createdAt)}
                  </time>
                </article>
              );
            })}

            {notice ? (
              <p className="mx-auto rounded-full bg-secondary px-4 py-2 text-xs text-primary">
                {notice}
              </p>
            ) : null}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-3 border-t border-secondary bg-surface p-3"
        >
          <label className="sr-only" htmlFor="message">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            value={body}
            rows={1}
            disabled={!activeConversation}
            onChange={(event) => setBody(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            className="max-h-32 min-h-11 flex-1 resize-none rounded-full border border-background bg-background px-4 py-2.5 text-primary outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
            placeholder={
              isOwner ? "Responder al cliente" : "Escribe un mensaje"
            }
          />
          <button
            type="submit"
            aria-label="Enviar mensaje"
            disabled={!activeConversation}
            className={buttonVariants({
              size: "icon-lg",
              className: "rounded-full",
            })}
          >
            <Send className="size-4" />
          </button>
        </form>
      </section>
    </div>
  );
}
