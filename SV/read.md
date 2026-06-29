Initial state
      │
      ▼
Identity mass
ε = 0.10
      │
      ▼
──────────────
Phase 1
──────────────
Adapt ε
(no mass update)
      │
      ▼
ε = 0.043
      │
      ▼
──────────────
Window 1
──────────────
Run HMC
Adapt ε
Collect samples
Estimate covariance Σ₁
Mass ← Σ₁⁻¹
      │
      ▼
──────────────
Window 2
──────────────
Run HMC
Adapt ε
Collect samples
Estimate covariance Σ₂
Mass ← Σ₂⁻¹
      │
      ▼
──────────────
Window 3
──────────────
Run HMC
Adapt ε
(No mass update)
Freeze ε and Mass
      │
      ▼
──────────────
Sampling
──────────────
Run HMC
No adaptation
Store samples
