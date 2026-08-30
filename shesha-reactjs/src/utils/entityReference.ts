import { IEntityReferenceDto } from "@/interfaces/shesha";
import { isDefined } from "./nullables";

/**
 * True when a value is a reference to an entity, i.e. an object carrying both a string `id` and
 * the `_className` naming its type.
 *
 * `_className` is what separates a reference from an arbitrary object that happens to have an id:
 * a plain `{ id, name }` is not a reference. Callers that only need "something with an id" —
 * form arguments, query params — should use `getIdOrUndefined` instead, which deliberately does
 * not require `_className`.
 *
 * This lives in its own leaf module, importing only the DTO type and `isDefined`, so that both
 * `utils/object.ts` and `utils/entity.ts` can use it. `utils/entity.ts` imports from
 * `utils/object.ts`, so a guard defined in either of those cannot be shared with the other
 * without creating a cycle — and `utils/entity.ts` additionally pulls in React and provider code
 * that the pure object helpers must stay free of.
 */
export const isEntityReference = (value: unknown): value is IEntityReferenceDto => {
  if (!isDefined(value) || typeof value !== "object" || Array.isArray(value))
    return false;

  const candidate = value as { id?: unknown; _className?: unknown };
  return typeof candidate.id === "string" && typeof candidate._className === "string";
};
