import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const materials = [
  { name: "Roble macizo", detail: "Tableros", status: "12 ud." },
  { name: "Barniz satinado", detail: "Acabados", status: "Bajo" },
  { name: "Bisagras laton", detail: "Herrajes", status: "34 ud." },
];

const events = [
  {
    image: "/images/project-armario.jpg",
    title: "Armario a medida",
    date: "18 mayo",
    time: "09:00",
  },
  {
    image: "/images/project-cocina.jpg",
    title: "Cocina en roble",
    date: "19 mayo",
    time: "16:00",
  },
];

const schedule = [
  { day: "18", title: "Revisar armario a medida", time: "09:00" },
  { day: "19", title: "Actualizar stock de tableros", time: "16:00" },
  { day: "20", title: "Preparar pedido de herrajes", time: "17:30" },
];

const calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

const projects = [
  {
    title: "Mesa roble",
    image: "/images/project-mesa-roble.jpg",
  },
  {
    title: "Cocina",
    image: "/images/project-cocina.jpg",
  },
];

const stats = [
  { label: "Stock", value: "60%", ring: "border-accent", track: "border-accent/25" },
  { label: "Pedidos", value: "90%", ring: "border-secondary", track: "border-secondary/25" },
  { label: "Rating", value: "75%", ring: "border-background", track: "border-background/25" },
];

export default function InventarioPage() {
  return (
    <div className="mx-auto grid w-full max-w-[940px] gap-4 lg:grid-cols-[1fr_185px]">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="aspect-square rounded-[8px] bg-secondary/70 py-3 shadow-none ring-0">
            <CardHeader className="px-4 pb-0">
              <CardTitle className="text-base font-semibold">
                Linked materials
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-1.5 px-4">
              {materials.map((material) => (
                <div
                  key={material.name}
                  className="flex h-10 items-center gap-2 rounded-full bg-background px-2"
                >
                  <div className="grid size-9 place-items-center rounded-full bg-surface font-serif text-sm font-semibold shadow-sm">
                    {material.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{material.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {material.detail}
                    </p>
                  </div>
                  <Badge className="h-6 rounded-full bg-primary px-2 text-xs text-surface">
                    {material.status}
                  </Badge>
                </div>
              ))}
              <div className="mt-auto pt-1 text-xs font-semibold text-primary">
                See more &gt;
              </div>
            </CardContent>
          </Card>

          <Card className="aspect-square rounded-[8px] bg-secondary/70 py-3 shadow-none ring-0">
            <CardHeader className="px-4 pb-0">
              <CardTitle className="text-base font-semibold">
                Upcoming events
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col space-y-1.5 px-4">
              {events.map((event) => (
                <div
                  key={event.title}
                  className="grid h-12 grid-cols-[38px_1fr_auto] items-center gap-2 rounded-full bg-background px-2"
                >
                  <div className="relative size-8 overflow-hidden rounded-full bg-secondary">
                    <Image
                      src={event.image}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{event.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {event.date}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{event.time}</span>
                </div>
              ))}
              <div className="mt-auto pt-1 text-xs font-semibold text-primary">
                See more &gt;
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[8px] bg-secondary/70 py-3 shadow-none ring-0">
          <CardContent className="px-4">
            <div className="grid gap-4 md:grid-cols-[0.72fr_1.28fr]">
              <div className="max-w-[230px] rounded-[8px] bg-background p-2.5">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                  <span>&lt;</span>
                  <span>Mayo 2026</span>
                  <span>&gt;</span>
                </div>
                <div className="mb-1 grid grid-cols-7 text-center text-[0.66rem] text-muted-foreground">
                  {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-center text-[0.68rem]">
                  {calendarDays.map((day) => (
                    <span
                      key={day}
                      className={
                        day === 18
                          ? "grid aspect-square place-items-center rounded-full bg-primary text-surface"
                          : "grid aspect-square place-items-center rounded-full text-muted-foreground"
                      }
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {schedule.map((item) => (
                  <div
                    key={item.title}
                    className="grid h-12 grid-cols-[40px_1fr] items-center gap-2 rounded-full bg-background px-2"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-surface text-xs font-semibold shadow-sm">
                      {item.day}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[8px] bg-secondary/70 py-3 shadow-none ring-0">
          <CardHeader className="px-4 pb-0">
            <CardTitle className="text-base font-semibold">My projects</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {projects.map((project) => (
                <div key={project.title}>
                  <div className="relative aspect-[2.15] overflow-hidden rounded-[8px] bg-secondary">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 260px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">
                    {project.title}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="rounded-[8px] bg-secondary/70 p-4 sm:grid sm:grid-cols-3 sm:gap-3 lg:block lg:space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="aspect-square rounded-[8px] bg-primary p-3 text-center text-surface shadow-none"
          >
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <span className="text-sm font-semibold text-surface/90">
                {stat.label}
              </span>
              <div
                className={`grid size-20 place-items-center rounded-full border-[6px] ${stat.track}`}
              >
                <div className={`grid size-14 place-items-center rounded-full border-[6px] ${stat.ring}`}>
                  <span className="text-base font-bold">{stat.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="pt-2 text-center text-sm font-semibold text-primary underline">
          See more &gt;
        </div>
      </aside>
    </div>
  );
}
