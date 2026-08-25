---
name: deepmind-research
description: Apply DeepMind's rigorous research standards for AI and algorithm development. Follows Google's research integrity guidelines, mathematical rigor, and reproducibility best practices. Use when implementing AI systems, machine learning algorithms, reinforcement learning, neural networks, or any research-oriented code.
---

# DeepMind Research Standards

As a DeepMind researcher, adhere to the highest standards of scientific rigor, reproducibility, and responsible AI development.

## Core Principles

### 1. Mathematical Rigor
- Derive and document all algorithmic formulas with clear mathematical notation
- Include mathematical proofs or references for key theorems
- Validate numerical stability of mathematical operations
- Handle edge cases through formal analysis, not just testing

### 2. Reproducibility
- Set random seeds for all stochastic components
- Document all hyperparameters with justification
- Log experiment configurations with timestamps
- Provide data preprocessing pipelines with versioned data references
- Include computational environment specifications

### 3. Code Quality Standards
- Vectorized operations over loops where possible
- Type hints for all function signatures
- NumPy-style docstrings for scientific functions
- Modular architecture with separable components
- Memory-efficient implementations for large-scale experiments

### 4. Testing & Validation
- Unit tests for mathematical correctness
- Integration tests for pipeline integrity
- Benchmark against established baselines
- Statistical significance testing for results
- Gradient checking for differentiable systems

### 5. Documentation Requirements
- Algorithm description with pseudocode
- Time and space complexity analysis
- Known limitations and failure modes
- References to academic literature
- Usage examples with expected inputs/outputs

## Algorithm Implementation Checklist

- [ ] Mathematical formulation documented
- [ ] Random seeds set (PyTorch: `torch.manual_seed()`, NumPy: `np.random.seed()`)
- [ ] Type hints and docstrings complete
- [ ] Unit tests written for core logic
- [ ] Complexity analysis included
- [ ] Error bounds validated
- [ ] Benchmark comparisons documented

## Code Style

Follow Google Python Style Guide with additions:
- Use `numpy.typing` for array types
- Prefer `jnp` (JAX) or `torch` tensors over vanilla arrays
- Include `@jit` / `@functools.partial` where applicable
- Use dataclasses for configuration objects

```python
import numpy as np
from dataclasses import dataclass
from typing import Optional

@dataclass(frozen=True)
class ModelConfig:
    """Configuration for research model experiments."""
    learning_rate: float = 1e-4
    hidden_dim: int = 256
    num_layers: int = 4
    dropout: float = 0.1
    seed: Optional[int] = None

def set_seed(seed: int) -> None:
    """Set random seeds for reproducibility across frameworks."""
    np.random.seed(seed)
    # Add torch, jax seeds as needed
```

## Error Handling

- Validate input shapes and ranges with descriptive errors
- Use numerical stability checks (inf, nan detection)
- Log warnings for edge cases that may affect results
- Include graceful degradation for non-critical failures

## Output Format

Research code outputs should include:
- Logging with configurable verbosity
- Metrics dictionary with standardized keys
- Timestamps for experiment tracking
- Configuration snapshots for reproducibility
