const blobs = [
  {
    className:
      "top-[8%] left-[5%] w-[380px] h-[380px] bg-orange-500 blur-[150px] opacity-80",
  },
  {
    className:
      "top-[25%] right-[8%] w-[320px] h-[320px] bg-amber-600 blur-[140px] opacity-70",
  },
  {
    className:
      "bottom-[18%] left-[18%] w-[360px] h-[360px] bg-yellow-500 blur-[160px] opacity-75",
  },
  {
    className:
      "bottom-[-20%] right-[-20%] w-[420px] h-[420px] bg-red-500 blur-[180px] opacity-85",
  },
  {
    className:
      "top-[10%] left-[10%] w-[250px] h-[250px] bg-rose-500 blur-[130px] opacity-60",
  },
];

export default function BlobBackground() {
  return (
    <>
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`fixed pointer-events-none rounded-full -z-10 ${blob.className}`}
        />
      ))}
    </>
  );
}
