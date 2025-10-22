const X = { a: 1, b: 2, c: 3, d: 4 };

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

getProperty(X, "a");
// getProperty(X, "m");

const Y = { id: 10, name: "Alice", active: true };

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  // TODO: реализовать
  return { ...obj, [key]: value };
}

// OK: тип value совпадает с T["name"] => string
setProperty({ ...Y }, "name", "Bob");

// OK: тип value совпадает с T["active"] => boolean
setProperty({ ...Y }, "active", false);

// setProperty({ ...Y }, "missing", 123);

// setProperty({ ...Y }, "name", 42);

// setProperty({ ...Y }, "active", "yes");

interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
}

type MyPartial<Type> = {
  [Key in keyof Type]?: Type[Key];
};

const user: MyPartial<User> = {
  name: "John",
};

type MyPartialKeys<Type, K extends keyof Type = keyof Type> = {
  [P in keyof Type as P extends K ? P : never]?: Type[P];
} & { [P in keyof Type as P extends K ? never : P]?: Type[P] };

type MyReadonly<Type> = {
  readonly [Key in keyof Type]: Type[Key];
};

const user2: MyReadonly<User> = { id: 1, name: "Mike", email: "mike.com" };

type myRequired2<Type> = {
  [Key in keyof Type]-?: Type[Key];
};

type MyPartialKeys2<Type, K extends keyof Type = keyof Type> = Omit<Type, K> &
  Partial<Pick<Type, K>>;

// 1) MyPartial — все поля опциональны
interface User1 {
  id: number;
  name: string;
  email?: string;
}

type MyPartialNew<T> = {
  [K in keyof T]?: T[K];
};

const a1: MyPartialNew<User1> = {};
const a2: MyPartialNew<User1> = { id: 1 };
const a3: MyPartialNew<User1> = { name: "Alice", email: "x@y.z" };
// @ts-expect-error: лишний ключ
const a4: MyPartialNew<User1> = { role: "admin" };

interface User2 {
  id: number;
  name?: string;
  email?: string | undefined;
}

type MyRequired<T> = {
  [K in keyof T]-?: T[K];
}; // реализуй

type R2 = MyRequired<User2>;
const b1: R2 = { id: 1, name: "A", email: "x@y.z" };
const b2: R2 = { id: 1, name: "", email: "x@y.z" }; // OK
const b3: R2 = { id: 1, email: "x@y.z" };

interface User4 {
  id: number;
  name: string;
  email: string;
}
type MyPick<T, K /* extends ... */> = {}; // реализуй

type D = MyPick<User4, "id" | "email">;
const d1: D = { id: 1, email: "x@y.z" };
// @ts-expect-error: нет name
const d2: D = { id: 1, email: "x@y.z", name: "A" };

type Admin = {
  isAdmin: boolean;
};

type Guest = {
  isGuest: boolean;
};

type Owner = {
  isOwner: boolean;
};

type Userintersection = Admin & Guest & Owner;

const newOwnerOrUser: Userintersection = {
  isAdmin: true,
  isGuest: true,
  isOwner: true,
};

type NewPartial<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

const newOwnerOrUser2: NewPartial<Userintersection, "isAdmin"> = {
  isAdmin: true,
};

const R = { a: 1, b: 2, c: 3, d: 4 };

function getRProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface Admin2 {
  isAdmin: boolean;
  isWorking: boolean;
  isOut: boolean;
}

type Part<T> = {
  readonly [K in keyof T]?: T[K];
};

const James: Part<Admin2> = {
  isAdmin: true,
};

James.isAdmin = false;
