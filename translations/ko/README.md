# React + TypeScript + Vite

이 템플릿은 Vite에서 HMR과 일부 ESLint 규칙을 사용하여 React를 작동시키기 위한 최소 설정을 제공합니다.

현재 두 개의 공식 플러그인이 제공됩니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) 은 [Oxc](https://oxc.rs)를 사용합니다
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) 은 [SWC](https://swc.rs/)를 사용합니다

## React Compiler

이 템플릿에서는 React Compiler가 활성화되어 있습니다. 자세한 내용은 [이 문서](https://react.dev/learn/react-compiler)를 참조하세요.

참고: 이는 Vite 개발 및 빌드 성능에 영향을 미칩니다.

## ESLint 구성 확장

프로덕션 애플리케이션을 개발 중이라면 타입 인식 린트 규칙을 활성화하도록 구성을 업데이트하는 것을 권장합니다:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 다른 구성...

      // tseslint.configs.recommended를 제거하고 이것을 대신 사용합니다
      tseslint.configs.recommendedTypeChecked,
      // 또는 더 엄격한 규칙을 위해 이것을 사용합니다
      tseslint.configs.strictTypeChecked,
      // 선택적으로 스타일 규칙을 위해 이것을 추가합니다
      tseslint.configs.stylisticTypeChecked,

      // 다른 구성...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 기타 옵션...
    },
  },
])
```

또한 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)와 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)을 설치하여 React 전용 린트 규칙을 사용할 수도 있습니다:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 다른 구성...
      // React 린트 규칙 활성화
      reactX.configs['recommended-typescript'],
      // React DOM 린트 규칙 활성화
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 기타 옵션...
    },
  },
])
```