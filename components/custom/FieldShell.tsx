"use client";

const FieldShell = ({
  label,
  rightIcon,
  children,
}: {
  label: string;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="relative border rounded-lg px-4 py-2">
    <span className="block text-[12px] leading-none text-gray-500 mb-1">
      {label}
    </span>
    <div className="flex items-center gap-2">{children}</div>
    {rightIcon ? (
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        {rightIcon}
      </div>
    ) : null}
  </div>
);

export default FieldShell;
