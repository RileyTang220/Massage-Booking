import clsx from "clsx";

export function SectionCard({
  title,
  description,
  className
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-[28px] border border-black/5 bg-white/80 p-6 shadow-card backdrop-blur", className)}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-black/70">{description}</p>
    </div>
  );
}
