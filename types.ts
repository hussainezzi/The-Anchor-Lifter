
export enum Step {
  STICKER_SHOCK = 'STICKER_SHOCK',
  PULLING_ANCHOR = 'PULLING_ANCHOR',
  COMPONENT_BUILD = 'COMPONENT_BUILD',
  VERDICT = 'VERDICT'
}

export interface ValueBlock {
  id: string;
  label: string;
  value: number;
}

export interface AppState {
  step: Step;
  anchorValue: number;
  components: ValueBlock[];
}
