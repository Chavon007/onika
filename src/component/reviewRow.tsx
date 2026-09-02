interface ReviewRowProps {
  label: string;
  value: string | number | undefined;
  isLast?: boolean;
}
function ReviewRow({ label, value, isLast = false }: ReviewRowProps) {
  return (
    <div className="border-b flex gap-3 items-center border-border p-3">
      <span className="text-sm text-muted font-sans font-medium">{label}</span>
      <span className="text-xs text-text/90 font-bold font-heading">
        {value || "—"}
      </span>
    </div>
  );
}

export default ReviewRow;
