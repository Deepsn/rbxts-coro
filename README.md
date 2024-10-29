# Coro

Coro wraps the complexity that comes with developing using Roblox's Actors and allows you to run your modules in parallel

## Features

- Automatic actor creation and management, eliminating the need for manual setup
- Get the results of your code running on parallel
- Simple API (`CreateCoro` and `Coro.Spawn`)

## Installation

To install the package, use the following command:

```sh
npm install @rbxts/coro
yarn install @rbxts/coro
pnpm install @rbxts/coro
bun install @rbxts/coro
```

## Usage

```typescript
// main.ts
import { CreateCoro } from "@rbxts/coro"

// Coro is a class that allows you to run modules in parallel
const coro = CreateCoro($getModuleTree("path/to/module"))

const promise = coro.Spawn(...arguments)

const [success, result] = promise.await();

print("Success:", success)
print("Result:", result)
```

```typescript
// module.ts
export = (arg1: string, arg2: number) => {
    print("Hello from module.ts!")
    print("Arguments:", arg1, arg2)
    return "Hello, World!"
}
```
