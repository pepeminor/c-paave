import { ArrayItem } from 'interfaces/common';
import { isEqual } from 'lodash';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ObjectHandler {
  obj: { [key: string]: any };

  constructor(initObj?: object) {
    if (initObj) this.obj = { ...initObj };
    else this.obj = {};
    return this;
  }

  mapFields(schema?: { [s: string]: MapFieldSchema }, defaultField?: object) {
    this.obj = mapFields(this.obj, schema, defaultField);
    return this;
  }

  deepMapFields(schema?: DeepMapSchema, defaultField?: object) {
    this.obj = deepMapFields(this.obj, schema, defaultField);
    return this;
  }

  removeFields(fields?: string[]) {
    this.obj = removeFields(this.obj, fields);
    return this;
  }

  setField(name: string, value: any) {
    this.obj[name] = value;
    return this;
  }

  getData() {
    return this.obj;
  }
}

export class Params extends ObjectHandler {
  constructor(params?: object) {
    super(params);
    this.obj = { showMessage: undefined, navigation: undefined, ...this.obj };
    return this;
  }

  setFieldWithCondition(name: string, value: any, condition?: boolean) {
    if (condition) this.obj[name] = value;
    return this;
  }
}

type MapFieldSchema = string | { key: string; transformValue: (value: any) => any };

export function mapFields(obj: any, schema?: { [s: string]: MapFieldSchema }, defaultField?: object) {
  obj = { ...obj };
  if (defaultField) obj = { ...defaultField, ...obj };
  if (!schema) return obj;
  const allKey = Object.keys(obj);
  const mapKey = Object.keys(schema);
  let newObj: any = {};
  allKey.forEach(key => {
    if (mapKey.includes(key)) {
      const schemaRow = schema[key];
      if (typeof schemaRow === 'string') newObj = { ...newObj, [schemaRow]: obj[key] };
      else newObj = { ...newObj, [schemaRow.key]: schemaRow.transformValue(obj[key]) };
    } else {
      newObj = { ...newObj, [key]: obj[key] };
    }
  });
  return newObj;
}

export function removeFields(obj: any, fields?: string[]) {
  const newObj = { ...obj };
  fields?.forEach(field => delete newObj[field]);
  return newObj;
}

export type DeepMapSchema = {
  [s: string]: MapFieldSchema | { key: string; value?: DeepMapSchema; defaultField?: object };
};

export function deepMapFields(obj: any, schema?: DeepMapSchema, defaultField?: object) {
  obj = { ...obj };
  if (defaultField) obj = { ...defaultField, ...obj };
  if (!schema) return obj;
  const reducedSchema: { [s: string]: MapFieldSchema } = {};
  Object.keys(schema).forEach(key => {
    const subSchema = schema[key];

    if (typeof subSchema === 'string' || 'transformValue' in subSchema) {
      reducedSchema[key] = subSchema;
      return;
    }

    const subObj = obj[key];
    if (!subObj && !subSchema.defaultField) return;
    else if (Array.isArray(subObj)) {
      obj[key] = subObj.map(item => deepMapFields(item, subSchema.value, subSchema.defaultField));
    } else {
      obj[key] = deepMapFields(subObj, subSchema.value, subSchema.defaultField);
    }
    reducedSchema[key] = subSchema.key;
  });
  return mapFields(obj, reducedSchema);
}

export type CompareFieldSchema<T> = T extends Array<unknown>
  ? CompareFieldSchemaObject<ArrayItem<T>>
  : T extends object | undefined
  ? CompareFieldSchemaObject<T>
  : boolean;

type CompareFieldSchemaObject<T> = {
  [Property in keyof T]?: CompareFieldSchema<
    T[Property] extends Array<unknown>
      ? boolean | ArrayItem<T[Property]>
      : T[Property] extends object | undefined
      ? boolean | T[Property]
      : boolean
  >;
};

export function compareField<T = any>(obj1: T, obj2: T, compareSchema: CompareFieldSchema<T>) {
  if (!compareSchema) return isEqual(obj1, obj2);
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null) return false;
  if (obj1 == null && obj2 == null) return true;
  if (typeof obj1 !== typeof obj2) return false;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!compareField(obj1[i], obj2[i], compareSchema)) return false;
    }
    return true;
  }
  let result = true;
  if (typeof obj1 !== 'object') return isEqual(obj1, obj2);
  for (const [key, value] of Object.entries(compareSchema) as [keyof T, any][]) {
    if (typeof value === 'boolean' && value) {
      if (!isEqual(obj1[key], obj2[key])) {
        result = false;
        break;
      }
    } else {
      if (!compareField(obj1[key], obj2[key], value)) {
        result = false;
        break;
      }
    }
  }
  return result;
}

export const compareSelectorField =
  <T>(fields: CompareFieldSchema<T>) =>
  (obj1: any, obj2: any) =>
    compareField(obj1, obj2, fields);
