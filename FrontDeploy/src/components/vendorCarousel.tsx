const VendorCarousel = () => {
  return (
    <section className="self-stretch flex flex-col items-start justify-start">
      <div className="self-stretch flex flex-col items-center justify-start py-10 px-16 gap-[24px] mt-[-7px] mq750:pl-8 mq750:pr-8 mq750:pb-[26px] mq750:box-border">
        <img
          className="self-stretch relative max-w-full overflow-hidden max-h-full object-contain"
          loading="lazy"
          alt=""
          src="https://picsum.photos/200"
        />
        <div className="flex flex-row items-center justify-center p-2 gap-[8px]">
          <div className="flex flex-row items-start justify-start p-2">
            <img
              className="h-6 w-6 relative"
              loading="lazy"
              alt=""
              src="/arrow-left.svg"
            />
          </div>
          <div className="flex flex-row items-center justify-start p-2 gap-[10px]">
            <img
              className="h-4 w-4 relative"
              loading="lazy"
              alt=""
              src="/dot-indictaor--1.svg"
            />
            <img
              className="h-3 w-3 relative"
              loading="lazy"
              alt=""
              src="/dot-indictaor--2.svg"
            />
            <img
              className="h-3 w-3 relative"
              loading="lazy"
              alt=""
              src="/dot-indictaor--2.svg"
            />
            <img
              className="h-3 w-3 relative"
              loading="lazy"
              alt=""
              src="/dot-indictaor--2.svg"
            />
            <img
              className="h-3 w-3 relative"
              loading="lazy"
              alt=""
              src="/dot-indictaor--2.svg"
            />
          </div>
          <div className="flex flex-row items-start justify-start p-2">
            <img
              className="h-6 w-6 relative"
              loading="lazy"
              alt=""
              src="/arrow-right.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorCarousel;
