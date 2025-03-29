## Performance Checklist
- **Optimized Function Handling with `useCallback`**
  - [x] Ensure event handlers are wrapped with `useCallback` to prevent function re-creation in:
    - `AddApplicationPage.tsx`
    - `EditApplicationPage.tsx`
    - `MainPage.tsx`

- **Prevented Expensive Recalculations with `useMemo`**
  - [x] Use `useMemo` to optimize expensive calculations and filtered data in:
    - `AddApplicationPage.tsx`
    - `EditApplicationPage.tsx`
    - `ApplicationDetailPage.tsx`
    - `MainPage.tsx`
- **Asset Optimization**
  - [x] Convert `mockMainPageView.png` to `mockMainPageView.webp` to reduce image size and improve performance.
