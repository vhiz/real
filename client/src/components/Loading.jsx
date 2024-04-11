import { InfinitySpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      <InfinitySpin
        visible={true}
        width="200"
        color="#7C7433"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}
