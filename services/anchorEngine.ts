
import { ValueBlock } from '../types.ts';

export const calculateIntrinsicValue = (components: ValueBlock[]): number => {
  return components.reduce((acc, curr) => acc + curr.value, 0);
};

export const getAdvice = (anchor: number, intrinsic: number): string => {
  const diff = anchor - intrinsic;

  if (diff > 0) {
    return `The seller started at $${anchor.toLocaleString()} to make $${(anchor * 0.8).toLocaleString()} feel like a deal. But your own logic says this is only worth $${intrinsic.toLocaleString()} to you. You aren't 'saving money' if you buy at their price; you are overspending by $${diff.toLocaleString()} relative to your true value.`;
  } else if (diff < 0) {
    return `Surprisingly, your bottom-up valuation ($${intrinsic.toLocaleString()}) exceeds the anchor price ($${anchor.toLocaleString()}). This suggests the initial offer might actually be a bargain, or you highly value components the seller has underpriced.`;
  } else {
    return `Your valuation perfectly matches the anchor. This is a rare moment of alignment between market suggestion and personal utility.`;
  }
};
