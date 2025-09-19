import { Loader as MantineLoader } from "@mantine/core";

function Loading() {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <MantineLoader color="orange"/>
    </div>
  );
}

export default Loading;