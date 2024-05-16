type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const mergeObjects = <T extends object>(
  subject: T,
  overwrites: DeepPartial<T>
): T => ({
  ...subject,
  ...overwrites,
});
