
### TL;DR

- transform class type DTO to interface type DTO
- generate API DTO interface from nestjs project includes dto files.

## Why use this

### Goal
- share API DTO type between ts projects

### How to work
- use `ts-morph` for accessing `typescript AST` during compilation
- mutate `typescript AST` to generate interface file as result file

### Project requirement
1. your dto should defined by class
2. dto defined file has only one class 
3. dto defined file has suffix `*.dto.ts` or `*.response.ts`


## Quick Start 

```
npx ts-node scripts/main.ts >> scripts/result.txt
```


## Disadvantage

1. Need nest.js project
    - this scripts only extract API DTO class type from nest.js project
2. need to deploy types
    - this scripts just for extracting and transforming, not share or deploy types.
    - you need to use monorepo or package to share types of result
3. a lot of bug
    - this scripts is not completed. there is problem you need to fix
        - import type refers origin project
        - not support for import type enum file
