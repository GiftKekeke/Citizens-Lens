import SavedList from "../_components/SavedList";

export default function SavedPage() {
  return (
    <div className="pt-4">
      <h1 className="text-xl font-bold">Saved</h1>
      <p className="text-[#5C665E]">
        Your saved answers, lessons and topics — stored only on this device.
      </p>
      <SavedList />
    </div>
  );
}
