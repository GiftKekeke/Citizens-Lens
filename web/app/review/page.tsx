import ReviewData from "../_components/ReviewData";

export default function ReviewPage() {
  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">Device data review</h1>
      <p className="text-[#5C665E]">
        Local launch metrics. Nothing leaves this device — review weekly and
        turn findings into content (see <code>demo-log.md</code>).
      </p>
      <div className="mt-3">
        <ReviewData />
      </div>
    </div>
  );
}
