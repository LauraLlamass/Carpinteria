"use client";

import { ChevronDown, Mail, Plus, Send, Trash2 } from "lucide-react";
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
  createdAt: string;
  messages: ChatMessage[];
};

const STORAGE_KEY = "carpinteria-conversations";
const LEGACY_STORAGE_KEY = "carpinteria-message-thread";
const ACTIVE_CHAT_KEY = "carpinteria-active-chat";
const EMPTY_MESSAGES: ChatMessage[] = [];

function createStarterMessage(createdAt: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    author: "workshop",
    body: "Estamos encantadas de ayudarle con su proyecto. Cuentenos por aquí y lo veremos desde el taller.",
    createdAt,
  };
}

function createConversation(title: string, createdAt = new Date().toISOString()) {
  return {
    id: crypto.randomUUID(),
    title,
    createdAt,
    messages: [createStarterMessage(createdAt)],
  };
}

function getInitialConversations() {
  if (typeof window === "undefined") {
    return [createConversation("Proyecto 1", "2026-05-08T00:00:00.000Z")];
  }

  const savedConversations = window.localStorage.getItem(STORAGE_KEY);

  if (savedConversations) {
    try {
      return JSON.parse(savedConversations) as Conversation[];
    } catch {
      return [createConversation("Proyecto 1")];
    }
  }

  const legacyThread = window.localStorage.getItem(LEGACY_STORAGE_KEY);

  if (legacyThread) {
    try {
      const messages = JSON.parse(legacyThread) as ChatMessage[];
      return [
        {
          id: crypto.randomUUID(),
          title: "Proyecto 1",
          createdAt: messages[0]?.createdAt ?? new Date().toISOString(),
          messages,
        },
      ];
    } catch {
      return [createConversation("Proyecto 1")];
    }
  }

  return [createConversation("Proyecto 1")];
}

function getInitialActiveChatId(conversations: Conversation[]) {
  if (typeof window === "undefined") {
    return conversations[0]?.id ?? "";
  }

  const savedActiveChat = window.localStorage.getItem(ACTIVE_CHAT_KEY);
  const activeChatExists = conversations.some(
    (conversation) => conversation.id === savedActiveChat,
  );

  return activeChatExists ? savedActiveChat ?? "" : conversations[0]?.id ?? "";
}

function getInitialChatState() {
  const conversations = getInitialConversations();

  return {
    conversations,
    activeChatId: getInitialActiveChatId(conversations),
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

export function MessageCenter() {
  const [chatState, setChatState] = useState(getInitialChatState);
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState("");
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const messageScrollRef = useRef<HTMLDivElement>(null);

  const { activeChatId, conversations } = chatState;
  const activeConversation =
    conversations.find((conversation) => conversation.id === activeChatId) ??
    conversations[0];
  const messages = activeConversation?.messages ?? EMPTY_MESSAGES;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    window.localStorage.setItem(ACTIVE_CHAT_KEY, activeChatId);
  }, [activeChatId]);

  useEffect(() => {
    const scrollElement = messageScrollRef.current;

    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [activeChatId, messages.length]);

  const mailtoHref = useMemo(() => {
    const recipient = email.trim();
    const subject = `Copia de la conversacion: ${activeConversation?.title ?? "Proyecto"}`;
    const transcript = buildTranscript(messages);
    const intro = "Hola,\n\nTe enviamos una copia de tu conversacion:\n\n";

    return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(`${intro}${transcript}`)}`;
  }, [activeConversation?.title, email, messages]);

  function updateActiveConversation(messagesForChat: ChatMessage[]) {
    setChatState((current) => ({
      ...current,
      conversations: current.conversations.map((conversation) =>
        conversation.id === current.activeChatId
          ? { ...conversation, messages: messagesForChat }
          : conversation,
      ),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
        author: "client" as const,
        body: trimmedBody,
        createdAt: now,
      },
      {
        id: crypto.randomUUID(),
        author: "workshop" as const,
        body: "Mensaje recibido. Te responderemos aqui con la primera valoracion del taller.",
        createdAt: now,
      },
    ];

    updateActiveConversation(nextMessages);
    setBody("");
    setNotice("");
  }

  function handleCopyClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const trimmedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      event.preventDefault();
      setNotice("Escribe un email valido antes de enviar la copia.");
    }
  }

  function createNewChat() {
    const nextConversation = createConversation(
      `Proyecto ${conversations.length + 1}`,
    );

    setChatState((current) => ({
      conversations: [nextConversation, ...current.conversations],
      activeChatId: nextConversation.id,
    }));
    setBody("");
    setNotice("");
    setIsCopyOpen(false);
  }

  function deleteActiveChat() {
    if (conversations.length === 1) {
      const replacement = createConversation("Proyecto 1");
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
            Tus mensajes
          </h2>
          <button
            type="button"
            aria-label="Eliminar chat abierto"
            onClick={deleteActiveChat}
            className="inline-flex size-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

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
                  {conversation.title}
                </span>
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
        </div>
      </aside>

      <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-secondary bg-surface">
        <div className="relative flex items-center justify-between gap-4 border-b border-secondary px-4 py-3">
          <div>
            <h2 className="font-serif text-2xl font-semibold leading-none text-primary">
              {activeConversation?.title ?? "Chat abierto"}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Taller conectado
            </p>
          </div>

          <button
            type="button"
            aria-expanded={isCopyOpen}
            onClick={() => setIsCopyOpen((current) => !current)}
            className={buttonVariants({
              variant: "outline",
              className: "rounded-full px-4",
            })}
          >
            <Mail className="size-4" />
            Copia
            <ChevronDown className="size-4" />
          </button>

          {isCopyOpen ? (
            <div className="absolute right-4 top-14 z-20 grid w-80 gap-3 rounded-lg border border-background bg-surface p-4 shadow-xl">
              <label
                className="text-sm font-medium text-primary"
                htmlFor="email"
              >
                Email para copia
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-background bg-background px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-accent"
                placeholder="tu@email.com"
                type="email"
              />
              <a
                href={mailtoHref}
                aria-disabled={!email.trim()}
                onClick={handleCopyClick}
                className={buttonVariants({
                  className: "rounded-full px-5 !text-surface",
                })}
              >
                <Mail className="size-4" />
                Enviar copia de la conversacion
              </a>
            </div>
          ) : null}
        </div>

        <div
          ref={messageScrollRef}
          className="min-h-0 flex-1 overflow-y-auto bg-background px-4 py-5"
        >
          <div className="flex min-h-full flex-col justify-end gap-3">
            {messages.map((message) => (
              <article
                key={message.id}
                className={cn(
                  "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm",
                  message.author === "client"
                    ? "ml-auto rounded-br-sm bg-primary text-surface"
                    : "mr-auto rounded-bl-sm border border-secondary bg-background text-primary",
                )}
              >
                <p>{message.body}</p>
                <time
                  className={cn(
                    "mt-1 block text-right text-[0.7rem]",
                    message.author === "client"
                      ? "text-surface"
                      : "text-muted-foreground",
                  )}
                  dateTime={message.createdAt}
                >
                  {formatDate(message.createdAt)}
                </time>
              </article>
            ))}

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
            onChange={(event) => setBody(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            className="max-h-32 min-h-11 flex-1 resize-none rounded-full border border-background bg-background px-4 py-2.5 text-primary outline-none focus:ring-2 focus:ring-accent"
            placeholder="Escribe un mensaje"
          />
          <button
            type="submit"
            aria-label="Enviar mensaje"
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
