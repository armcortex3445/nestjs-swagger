
# TLDR

# Swagger 적용

## 프로토타이핑1

### Before
- 메인 프로젝트에 Swagger를 적용하기 전에, 프로토타이핑을 통해 Swagger를 경험할 필요가 있었음
    - HTTP API 문서화와 e2e API 테스트를 제공이 목적
        - 왜냐하면, 프론트 앤드에서 백엔드 API 요청시, 매번 백엔드 코드 참조가 발생하여 비효률적이라고 판단.
        - API를 검증하기 위해서, 요청을 발생시키는 방법이 번거로움.



### Bridge
- nestjs 템플릿 프로젝트에서 swagger를 사용하는 해당 프로젝트로 프로토타이핑 진행
- [nestjs 공식문서](https://docs.nestjs.com/openapi/introduction) 참조하며 예시 코드 적용해봄
- `nestjs/swagger` 적용
- `nest-cli`에서 `nestjs/swagger`플러그인을 적용하여 Swagger 메타데이터 생성 자동화
    - DTO 클래스에 대해서 `@ApiProperty()`적용 없이 메타데이터(Schema)를 자동 생성.

### After
- `nest-cli`를 사용하여 Swagger를 빠르게 적용할 수 있음을 경험
- Swagger가 제공하는 HTTP API 문서와 API 테스트가 유용함을 파악

## 메인 프로젝트에 적용1

### Before 
- HTTP API 문서화와 API 테스트가 필요한 상황


### Bridge
- `nest-cli`의 `nestjs/swagger`플러그인과 `nestjs/swagger` 적용
- dto 파일 이름에 `*.dto.ts` 그리고 `*.response.ts` suffix 적용하여 dto(Schema) 자동 생성 파일을 필터링함

### After
- HTTP API 문서 생성 및 API 테스트 UI 제공됨

## 메인 프로젝트에 적용2

### Before
- HTTP API 문서의 DTO(Schema)가 부정확홤 

### Bridge
- `@ApiProperty()` 와 `@ApiExtraModels()`을 사용하여 Schema 생성에 필요한 추가정보를 플러그인에 전달.

### After
- HTTP API 문서의 DTO(Schema)가 정확도가 증가함

## 메인프로젝트 적용 3

### Before
- HTTP API 문서의 Response DTO(Schema) 부정확함
    - 문서 Schema field가 실제로는 제공되지 않음에도 문서에는 명시됨
- Response DTO 코드와 문서 맵핑 복잡성
    - Response DTO(Schema) 이름을 검색하여 코드에서 Response Class를 찾기 어려움.
    - 코드를 통해서 문서의 Response DTO(Schema)를 관리하기 어려움
- 현재 프로젝트에서는 일부 API는 Response DTO가 명시되어있지만, 그 외 API는 Entity 클래스를 DTO로 사용함

### Bridge
- 모든 API에 대해서 Response DTO 클래스를 정의
- Response DTO 간에 포함관계가 성립되는 경우에 대해서, `@ApiProperty()`를 사용하여 Schema를 재정의함

### After
- HTTP API 문서의 Response DTO(Schema) 정확도 증가
- Response DTO(Schema)의 Entity 클래스 의존도를 감소시켜 복잡성 감소시킴
- Response DTO(Schema)와 1대 1로 Response DTO class를 맵핑

## 메인프로젝트 적용 4

### Before
- HTTP API 문서에서 응답 성공 이외의 응답 상태에 대한 정보가 없음
- HTTP API 문서에 필요한 header 필드에 대한 정보가 없음

### Bridge
- `AuthGuard` 로직을 사용하는 API 정보를 문서화하도록 로직 수정
    - `@UseGuard()`, `@ApiResponse()`,`@ApiHeader` 등을 합성하고 Api Handler에 합성된 데코레이터를 적용

### After
- Http API 문서에 응답 성공 과 인증 및 권한 실패에 대한 정보 추가됨
- 인증 및 로직 권한이 필요한 API를 파악 가능
    - 해당 API에 필요한 헤더 정보 또한 파악 가능

# ts-morph 사용

## 프로토타이핑 적용1

### Before
- 현재 프로젝트에 정의된 DTO 클래스 타입을 외부 ts 프로젝트에서 사용하도록 변형이 필요
    - 외부 프로젝트는 최소 2개가 존재
    - DTO 수정시 매번 최신화하는 작업 발생

### Bridge
- ts-morph를 사용하여 ts compiler API를 통해 클래스 타입 AST를 변형하여 Interface AST로 변경

### After
- ts compiler로 변경됨

## 프로토타이핑 적용2

### Before
- 인터페이스로 변형된 결과물은 `import Type`때문에 현재 프로젝트에 의존성이 발생함

### Bridge
- 변형된 인터페이스의 `import type` 의존성을 제거하고, 생성된 결과물 사이에서 의존하도록 코드 추가
    - 해당 작업 진행하면서 느낀점은 자동화를 통해서 이득을 볼 지언정 내가 관리해야할 코드가 늘어나는 문제가 생김
- 외부 라이브러리를 탐색하여 현재 상황에서 적용할 수 있는 방법 모색.
- open API Schema를 TS 인터페이스로 변경해주는 라이브러리 발견 및 시도

### After
- openAPI-typescript 시도
- API generator 라이브러리를 알게됨
- ts-morph 이외에 다른 방식을 고려하게됨

## 프로토타이핑 적용3

### Before

- ts-morph 사용시 러닝커브, 유지보수 그리고 작업 증가 문제가 있음

### Bridge
- swagger Open API를 사용하여 API Generator를 만들기 위해 프로토타이핑 수정