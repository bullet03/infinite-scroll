import { useEffect, useRef, useLayoutEffect } from "react";
import { ObserverParams} from "../@types";

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: [0.5],
};

function useIntersectionObserver({
  setIndexes,
  indexes,
  ulRef,
  data,
  VIEW_IN_SCROLL,
  STEP
}: ObserverParams) {
  const [firstIndex, lastIndex] = indexes;
  const length = data.length;

  const newLastIndex = Math.min(lastIndex + STEP, length);
  const newFirstIndex = Math.max(firstIndex - STEP, 0);

  const diffDown = newLastIndex - firstIndex;
  const diffUp = lastIndex - newFirstIndex;

  const lastElRef = useRef<null | Element>(null);

  const callbackBottom = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.intersectionRatio > 0) {
      if (lastIndex >= length) return;
      lastElRef.current = entry.target;
      if (diffDown > VIEW_IN_SCROLL) {
        setIndexes([newLastIndex - VIEW_IN_SCROLL, newLastIndex]);
      } else {
        setIndexes([firstIndex, newLastIndex]);
      }
    }
  };

  const callbackUpper = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.intersectionRatio > 0) {
      if (firstIndex <= 0) return;
      lastElRef.current = entry.target;
      if (diffUp > VIEW_IN_SCROLL) {
        setIndexes([newFirstIndex, newFirstIndex + VIEW_IN_SCROLL]);
      } else {
        setIndexes([newFirstIndex, lastIndex]);
      }
    }
  };

  useLayoutEffect(() => {
    if (!lastElRef || !lastElRef.current) return;

    lastElRef.current.scrollIntoView();
  });

  const bottomObserver = new IntersectionObserver(callbackBottom, options);
  const upperObserver = new IntersectionObserver(callbackUpper, options);

  useEffect(() => {
    // для навешевания реального ДОМ узла в обзёрвере
    if (!ulRef.current) return;
    if (ulRef.current.children.length === 0) return;

    const lastEl = ulRef.current.lastElementChild!;
    const firstEl = ulRef.current.firstElementChild!;

    bottomObserver.observe(lastEl);
    upperObserver.observe(firstEl);

    return () => {
      bottomObserver.disconnect();
      upperObserver.disconnect();
    };
  });
}

export { useIntersectionObserver };
