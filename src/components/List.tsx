import React, {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type Props<T> = {
  list: T[];
  renderItem: (item: T) => ReactNode;
  style?: CSSProperties;
  hasMore: boolean;
  onFetchMore: (page: number) => void;
  currentPage?: number;
  /**
   * If height is set, the list will be scrollable else it will use the window scroller
   */
  height?: number;
  className?: string;
};

export type ListHandler = {
  resetPage: () => void;
  scrollToTop: () => void;
};

const ListInner = <T,>(
  {
    list,
    renderItem,
    style,
    hasMore,
    onFetchMore,
    height,
    className,
  }: Props<T>,
  ref: ForwardedRef<ListHandler>
) => {
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  useImperativeHandle(ref, () => ({
    resetPage: () => setPage(1),
    scrollToTop: () => {
      containerRef.current?.scrollTo(0, 0);
    },
  }));

  useEffect(() => {
    if (page > 1 && hasMore) {
      onFetchMore(page);
    }

    if (!hasMore && observer.current) {
      observer.current.disconnect();
    }
  }, [page, hasMore, onFetchMore]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const loaderElement = loader.current;
    observer.current = new IntersectionObserver(handleObserver, options);
    if (loaderElement) {
      observer.current.observe(loaderElement);
    }
    return () => {
      if (loaderElement) {
        observer.current?.unobserve(loaderElement);
      }
    };
  }, [handleObserver, loader]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        ...(height && { height, overflowY: "auto" }),
      }}
      ref={containerRef}
      className={className}
    >
      <div style={style}>
        {list.map((item, index) => (
          <Fragment key={index}>{renderItem(item)}</Fragment>
        ))}
      </div>
      <div ref={loader} />
    </div>
  );
};

const List = forwardRef(ListInner) as <T>(
  props: Props<T> & { ref?: React.ForwardedRef<{ resetPage: () => void }> }
) => ReturnType<typeof ListInner>;

export default List;
