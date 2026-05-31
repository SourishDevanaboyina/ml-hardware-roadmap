const PHASES = [
  { id: 0, label: "Phase 1", title: "Python + data science essentials", subtitle: "Days 1–12 · Build the toolbox", color: "#1D9E75" },
  { id: 1, label: "Phase 2", title: "Classical ML on hardware data", subtitle: "Days 13–27 · Random forests, XGBoost, SHAP", color: "#534AB7" },
  { id: 2, label: "Phase 3", title: "Neural networks + PyTorch", subtitle: "Days 28–40 · Backprop, LSTMs, transformers", color: "#D85A30" },
  { id: 3, label: "Phase 4", title: "Capstone build + ship", subtitle: "Days 41–50 · ML cache replacement predictor", color: "#BA7517" },
];

const DAYS = [
  {
    d: 1, title: "Python review: the parts that matter", phase: 0, badges: ["read", "code"],
    read: [
      "Pytopia ML repo → 01_Python/ → chapters 1–3 (functions, classes, comprehensions)",
      "Focus: lambda functions, *args/**kwargs, class inheritance — used constantly in PyTorch"
    ],
    code: [
      "Complete <code>day01_python_warmup.py</code> — 10 exercises",
      "Write a <code>DataLoader</code> class with <code>__iter__</code> and <code>__len__</code>",
      "Use list comprehensions to filter hardware counter data",
      "Write decorators (used everywhere in PyTorch)"
    ],
    hw: "Every ML training loop is a Python class with <code>__iter__</code>. When NVIDIA talks about CUDA streams, the Python scheduler above them uses the same patterns.",
    mentor: "Walk me through how Python's <code>__iter__</code> works and where you'd use it in an ML training loop."
  },
  {
    d: 2, title: "NumPy: the language of ML", phase: 0, badges: ["read", "code"],
    read: [
      "Pytopia ML repo → 02_NumPy/ → chapters 1–4",
      "Key concepts: broadcasting rules, axis operations, fancy indexing, <code>np.einsum</code>"
    ],
    code: [
      "Create a (1000, 8) array of 1000 benchmark samples with 8 hardware counters",
      "Compute mean/std/min/max per counter using axis ops — no loops",
      "Normalize using broadcasting: <code>(X - X.mean(axis=0)) / X.std(axis=0)</code>",
      "Bonus: implement <code>softmax(Q @ K.T / sqrt(d_k))</code> — this is transformer attention"
    ],
    hw: "Matrix multiplication is the heart of every neural network. NVIDIA's GEMM optimization is about making this faster on silicon.",
    mentor: "What happens when you multiply a (1000, 8) array by a (8,) array? Draw it out."
  },
  {
    d: 3, title: "Pandas: reading hardware trace data", phase: 0, badges: ["read", "code"],
    read: [
      "Pytopia ML repo → 03_Pandas/ → chapters 1–3 (DataFrames, indexing, groupby)"
    ],
    code: [
      "Download SPEC CPU2017 results CSV from Kaggle",
      "Load into DataFrame, check for missing values: <code>df.isnull().sum()</code>",
      "<code>df.groupby('benchmark')['IPC'].describe()</code>",
      "Find all benchmarks where L1 miss rate > 0.05",
      "Export cleaned DataFrame to <code>cleaned_traces.csv</code>"
    ],
    hw: "When you look at hardware trace data, always ask: which counters are correlated? What clusters naturally? You're building intuition for the capstone.",
    mentor: "What's the difference between <code>groupby().mean()</code> and <code>groupby().agg()</code>? When would you use each?"
  },
  {
    d: 4, title: "Matplotlib + Seaborn: making data visible", phase: 0, badges: ["read", "code"],
    read: [
      "Pytopia ML repo → 04_Visualization/ → chapters 1–2",
      "Skim the matplotlib cheatsheet"
    ],
    code: [
      "Bar chart: IPC comparison across 10 benchmarks with error bars",
      "Scatter: L1 miss rate vs IPC — do you see a trend?",
      "Heatmap: correlation matrix of all 8 hardware counters",
      "Roofline-style plot: arithmetic intensity vs performance"
    ],
    hw: "Every paper at Apple or NVIDIA has roofline plots and performance heatmaps. Making these fluently is a professional skill.",
    mentor: "Looking at your correlation heatmap — which two counters are most correlated? What does that mean architecturally?"
  },
  {
    d: 5, title: "Statistics: math behind every ML decision", phase: 0, badges: ["read", "code"],
    read: [
      "Khan Academy: probability distributions, mean/variance (30 min)",
      "Skim: Why statistical significance matters in ML (arXiv 1803.07925)"
    ],
    code: [
      "Fit a normal distribution: <code>scipy.stats.norm.fit(df['IPC'])</code>",
      "t-test: do two workload classes have significantly different IPC?",
      "Bootstrap confidence intervals for mean IPC (1000 samples)",
      "Plot: histogram with fitted distribution overlay"
    ],
    hw: "When you benchmark your cache predictor, you need to show the improvement is statistically significant — not just a lucky run.",
    mentor: "If a model improved hit rate by 2% on one run, how would you know if that's real or noise?"
  },
  {
    d: 6, title: "Scikit-learn: ML in 30 lines", phase: 0, badges: ["read", "code"],
    read: [
      "Sklearn docs → Getting Started guide — read fully",
      "Focus: the <code>fit/predict/score</code> API pattern"
    ],
    code: [
      "Load hardware trace CSV",
      "Define X = 4 hardware counters, y = IPC",
      "<code>train_test_split</code> with test_size=0.2",
      "Train <code>LinearRegression</code>, compute R², MAE, RMSE",
      "Baseline: what R² if you predict mean IPC for everything?"
    ],
    hw: "You just predicted IPC from hardware counters. This is what performance engineers at Intel, Apple, and NVIDIA do for a living.",
    mentor: "Why is R² a better metric than MAE for this regression problem?"
  },
  {
    d: 7, title: "Assignment 1: hardware EDA report", phase: 0, badges: ["assign"],
    read: ["No new reading — full build day"],
    code: [
      "<code>assignment1_hardware_eda.ipynb</code> must include:",
      "Dataset overview: samples, features, missing data",
      "Correlation heatmap + top 3 correlated pairs with architectural explanation",
      "Classify benchmarks as memory-bound or compute-bound",
      "Linear regression IPC predictor with metrics table",
      "3 insights written in architectural terms"
    ],
    hw: "Commit history should show 7 days of daily commits — not one giant commit. That signals real work to interviewers.",
    mentor: "Show me the 3 insights from your EDA. Now explain each one using architectural language only."
  },
  {
    d: 8, title: "Probability distributions in hardware", phase: 0, badges: ["read", "code"],
    read: [
      "Pytopia ML repo → 05_Statistics/ → chapters 1–2",
      "Key: normal vs log-normal, bimodal distributions, central limit theorem"
    ],
    code: [
      "Plot histogram of IPC values — which distribution fits?",
      "Fit normal AND log-normal, overlay on histogram",
      "Q-Q plot: <code>scipy.stats.probplot()</code>",
      "Gaussian Mixture Model k=2 on L1 miss rate — is it bimodal?",
      "Markdown: why might IPC follow log-normal rather than normal?"
    ],
    hw: "L1 miss rates are often bimodal — cache-friendly workloads cluster near 0, cache-thrashing workloads near 0.2. A single Gaussian misses this.",
    mentor: "If IPC follows a log-normal distribution, what does that imply about underlying microarchitectural processes?"
  },
  {
    d: 9, title: "Correlation, causation, and counters", phase: 0, badges: ["read", "code"],
    read: [
      "Search Google Scholar: 'hardware performance counter machine learning workload characterization'",
      "Read any paper with 100+ citations — abstract + figures only"
    ],
    code: [
      "Pearson + Spearman correlation matrices",
      "Variance Inflation Factor (VIF) for multicollinearity",
      "<code>SelectKBest</code> for top 4 features for IPC",
      "Compare feature importance vs correlation — do they agree?"
    ],
    hw: "Feature selection in hardware ML is different — every counter has a PMU measurement cost. A model needing 20 counters is useless in production.",
    mentor: "What's the difference between correlation and causation? Give me a hardware counter example where high correlation might be misleading."
  },
  {
    d: 10, title: "Architecture framing: the mental map", phase: 0, badges: ["read", "hw"],
    read: [
      "Hawkeye paper (utexas.edu/users/lin/papers/isca16.pdf) — pages 1–3 only",
      "Review your ECE memory hierarchy notes: what happens on an LLC miss?"
    ],
    code: [
      "Fill in the arch mapping table in <code>day10_arch_mapping.md</code>",
      "Map every ML concept to a hardware equivalent",
      "This table goes in your capstone report introduction"
    ],
    hw: "This is the day that separates ECE ML engineers from CS ML engineers. You already know the hardware — now name the connection explicitly.",
    mentor: "Without looking at notes: what is reuse distance, and why is it the single most important feature for predicting cache behavior?"
  },
  {
    d: 11, title: "Random forests: best model for hardware data", phase: 0, badges: ["read", "code"],
    read: [
      "Pytopia ML repo → 08_Ensemble/ → Random Forest section",
      "Sklearn Random Forest docs — first 2 sections"
    ],
    code: [
      "<code>RandomForestRegressor</code> for IPC — beat Day 6 R²",
      "<code>RandomForestClassifier</code> for memory-bound vs compute-bound",
      "5-fold <code>cross_val_score</code>",
      "Feature importances bar chart"
    ],
    hw: "Random forests work extremely well on tabular hardware counter data. CPU architects use them in practice for workload classification.",
    mentor: "Why does a random forest outperform a single decision tree? What does 'random' mean in random forest?"
  },
  {
    d: 12, title: "Assignment 2: workload classifier", phase: 0, badges: ["assign"],
    read: ["No new reading — build day"],
    code: [
      "<code>RandomForestClassifier</code> with <code>GridSearchCV</code>",
      "Tune: <code>n_estimators</code>, <code>max_depth</code>, <code>min_samples_split</code>",
      "5-fold CV — report mean ± std for F1",
      "Confusion matrix + classification report",
      "Failure analysis: 3 misclassified benchmarks and why"
    ],
    hw: "The failure analysis is the most important section. Engineers who can explain why their model fails are more valuable than those who just report accuracy.",
    mentor: "Your model misclassified X. Looking at its counter values, why do you think the model got confused?"
  },
  {
    d: 13, title: "XGBoost: most powerful classical model", phase: 1, badges: ["read", "code"],
    read: [
      "XGBoost paper (arXiv 1603.02754) — abstract + section 1 + figure 1 only",
      "XGBoost docs: Getting Started"
    ],
    code: [
      "<code>XGBRegressor</code> for IPC — beat random forest R²",
      "Plot training vs validation loss — overfitting?",
      "Tune 3 hyperparameters with <code>GridSearchCV</code>",
      "<code>xgb.plot_importance()</code>",
      "Comparison table: LinearReg | RandomForest | XGBoost — R², MAE, RMSE"
    ],
    hw: "XGBoost wins more ML competitions than any other model. For hardware data (tabular, small N), it often outperforms neural networks.",
    mentor: "What is gradient boosting conceptually? How does XGBoost differ from a random forest?"
  },
  {
    d: 14, title: "LightGBM + Optuna tuning", phase: 1, badges: ["read", "code"],
    read: [
      "LightGBM docs: Quick Start",
      "Understand leaf-wise vs level-wise growth"
    ],
    code: [
      "<code>pip install optuna</code>",
      "Train LightGBM on IPC prediction",
      "Optuna objective tuning num_leaves, learning_rate, n_estimators",
      "<code>study.optimize(objective, n_trials=50)</code>",
      "Plot: optimization history — does it converge?"
    ],
    hw: "LightGBM is faster than XGBoost for large datasets. At Apple and NVIDIA, inference data comes in at millions of samples — speed matters.",
    mentor: "What does <code>early_stopping_rounds</code> do and why does it help?"
  },
  {
    d: 15, title: "SHAP values: explaining ML predictions", phase: 1, badges: ["read", "code"],
    read: [
      "SHAP docs: Getting Started tutorial — read fully",
      "Understand: global importance vs local importance"
    ],
    code: [
      "<code>pip install shap</code>",
      "<code>shap.TreeExplainer</code> on your XGBoost",
      "<code>shap.summary_plot()</code> — global feature importance",
      "<code>shap.waterfall_plot()</code> — explain highest-IPC benchmark",
      "Architectural explanation for top 3 features' SHAP patterns"
    ],
    hw: "SHAP lets you say: 'My model predicted low hit rate BECAUSE this benchmark has high reuse distance AND irregular access patterns.' That's research-quality analysis.",
    mentor: "Show me the SHAP waterfall for your most interesting benchmark. Explain each bar in hardware terms."
  },
  {
    d: 16, title: "K-means clustering: workloads automatically", phase: 1, badges: ["read", "code"],
    read: ["Pytopia ML repo → 10_Clustering/ → K-Means section"],
    code: [
      "K-means with k=2,3,4,5",
      "Silhouette score for each k — plot elbow curve",
      "PCA to 2D, plot clusters",
      "Name each cluster: 'High-IPC compute-bound', 'Memory-thrashing', 'Balanced'"
    ],
    hw: "Hardware engineers cluster workloads to design cache hierarchies that work well for 'typical' programs. ML does this automatically and finds patterns humans miss.",
    mentor: "You chose k=3. Justify using both silhouette score AND your hardware intuition."
  },
  {
    d: 17, title: "PCA and t-SNE: hardware data in 2D", phase: 1, badges: ["code"],
    read: ["Skim sklearn PCA docs — 5 min"],
    code: [
      "<code>PCA(n_components=2)</code> — scatter plot by workload type",
      "Print explained variance ratio",
      "Plot component loadings — what does PC1 represent in hardware terms?",
      "t-SNE — same scatter, compare to PCA"
    ],
    hw: "20-dimensional hardware counter space is impossible to visualize. PCA reduction is standard in hardware ML papers at ISCA and MICRO.",
    mentor: "PC1 explains what % of variance? Based on the loadings, what does PC1 physically represent?"
  },
  {
    d: 18, title: "Assignment 3: full classical ML pipeline", phase: 1, badges: ["assign"],
    read: ["No new reading"],
    code: [
      "Pretend you're a performance analyst at Intel",
      "3 clusters with names + PCA plot",
      "XGBoost IPC predictor beating R²>0.85",
      "SHAP for 3 interesting benchmarks with hardware explanations",
      "3 new engineered features: <code>memory_pressure</code>, <code>branch_efficiency</code>, <code>cache_efficiency</code>",
      "Executive summary: 1 page plain English"
    ],
    hw: "The executive summary is for a chip architect, not a data scientist. Write it without the word 'model' — talk about workloads, counters, and memory systems.",
    mentor: "Read me your executive summary out loud. Does it sound like something you'd present to an Intel architect?"
  },
  {
    d: 19, title: "Anomaly detection: weird hardware behavior", phase: 1, badges: ["code"],
    read: ["Skim sklearn IsolationForest docs"],
    code: [
      "<code>IsolationForest(contamination=0.05)</code>",
      "Visualize anomalies in PCA space",
      "Simulate thermal throttling: multiply IPC by 0.3",
      "Does Isolation Forest catch it?",
      "Retrain XGBoost without anomalies — improvement?"
    ],
    hw: "Thermal throttling, hardware bugs, and measurement noise create outlier samples. A model trained on these fails silently. This is a real problem NVIDIA engineers deal with.",
    mentor: "If Isolation Forest flags a benchmark as anomalous, what would you do next before retraining? Don't just say 'remove it.'"
  },
  {
    d: 20, title: "Karpathy micrograd: backprop from scratch", phase: 1, badges: ["read", "code"],
    read: [
      "Watch full Karpathy micrograd video — 2h 25m, no skipping",
      "Read micrograd source code — only 100 lines"
    ],
    code: [
      "<code>git clone github.com/karpathy/micrograd</code>",
      "Run all README examples",
      "Extend: add tanh activation, verify gradient manually",
      "Train tiny MLP on memory-bound classification using ONLY micrograd"
    ],
    hw: "Every neural network on Apple's Neural Engine and NVIDIA's GPU learns through this exact process — just parallelized across billions of parameters.",
    mentor: "Without using the word 'gradient', explain why the chain rule is necessary for training a neural network."
  },
  {
    d: 21, title: "PyTorch basics: tensors and autograd", phase: 1, badges: ["read", "code"],
    read: ["PyTorch 60-minute blitz (pytorch.org) — complete it fully"],
    code: [
      "Verify autograd manually — compute gradient by hand, confirm PyTorch agrees",
      "3-layer MLP using <code>nn.Sequential</code>",
      "Training loop: zero_grad → forward → loss → backward → step",
      "Plot training loss curve",
      "Compare to XGBoost — does the MLP match R²?"
    ],
    hw: "<code>nn.Sequential</code> is a clean Python class — same __call__ pattern as Day 1 exercises. PyTorch adds GPU dispatch underneath.",
    mentor: "What does <code>optimizer.zero_grad()</code> do and why is it necessary? What happens if you forget it?"
  },
  {
    d: 22, title: "PyTorch DataLoaders: real data", phase: 1, badges: ["code"],
    read: ["Skim PyTorch Dataset and DataLoader docs — 10 min"],
    code: [
      "<code>HardwareCounterDataset</code> extending <code>torch.utils.data.Dataset</code>",
      "<code>DataLoader</code> with batch_size=32, shuffle=True",
      "Data augmentation: Gaussian noise on counter values",
      "Early stopping: stop if val loss doesn't improve for 10 epochs",
      "<code>torch.save(model.state_dict(), 'ipc_predictor.pt')</code>"
    ],
    hw: "DataLoaders pipeline feeds data to GPU without blocking compute. Same principle as DMA transfers feeding a CPU — don't starve the processor.",
    mentor: "Why do we shuffle training data but NOT validation or test data?"
  },
  {
    d: 23, title: "MLP architecture choices", phase: 1, badges: ["code"],
    read: ["No reading — experiment day"],
    code: [
      "Compare 4 architectures on IPC regression:",
      "Narrow deep: [8→16→16→16→1]",
      "Wide shallow: [8→128→1]",
      "Bottleneck: [8→64→8→64→1]",
      "ResNet-style with skip connection",
      "Plot loss curves, report test R²"
    ],
    hw: "For small tabular datasets (N < 10K), deep MLPs often underperform gradient boosting. Knowing WHEN not to use neural networks is engineering maturity.",
    mentor: "Why does a skip connection sometimes help even in a tiny 3-layer MLP?"
  },
  {
    d: 24, title: "Batch norm, dropout, regularization", phase: 1, badges: ["code"],
    read: ["Skim PyTorch BatchNorm1d and Dropout docs"],
    code: [
      "Train with/without BatchNorm — compare loss curves",
      "Try dropout=0, 0.2, 0.5 — find the sweet spot",
      "L2 regularization: <code>weight_decay=1e-4</code>",
      "Plot validation loss for all variants"
    ],
    hw: "Batch normalization was invented at Google Brain to stabilize training. The same principle applies in digital circuits — normalization prevents saturation.",
    mentor: "Why does BatchNorm help with training stability? What problem does it solve?"
  },
  {
    d: 25, title: "Assignment 4: MLP vs XGBoost showdown", phase: 1, badges: ["assign"],
    read: ["No new reading"],
    code: [
      "Full comparison: LinearReg, RandomForest, XGBoost, MLP, Regularized MLP",
      "Inference latency: <code>time.perf_counter()</code> for 1000 predictions",
      "Training data sensitivity: 10/25/50/75/100% — plot R² vs size",
      "Recommendation paragraph: which would you deploy?"
    ],
    hw: "For hardware counter data (small, tabular), XGBoost usually wins. Recognizing when NOT to use neural networks separates a good ML engineer from a framework user.",
    mentor: "You recommended X. I'm an Intel performance engineer and I'm skeptical. Convince me."
  },
  {
    d: 26, title: "LSTMs: sequence modeling for memory traces", phase: 2, badges: ["read", "code"],
    read: ["Read fully: colah.github.io/posts/2015-08-Understanding-LSTMs/"],
    code: [
      "Build <code>CachePredictor</code> LSTM in PyTorch from scratch",
      "Input: last 16 memory addresses → predict hit/miss",
      "<code>nn.LSTM(input_size, hidden_size=64, num_layers=2)</code>",
      "Train on synthetic sequences",
      "Achieve >65% accuracy on held-out sequences"
    ],
    hw: "Memory access patterns are sequences — the address you access next depends on what you accessed before. LSTMs model this sequential dependency.",
    mentor: "Draw the LSTM cell gates on a whiteboard. What does each gate control and why is that useful for cache prediction?"
  },
  {
    d: 27, title: "Champsim trace data preparation", phase: 2, badges: ["code"],
    read: ["Champsim README — setup section only"],
    code: [
      "<code>git clone github.com/ChampSim/ChampSim</code>",
      "<code>cmake -B build && cmake --build build</code>",
      "OR use <code>generate_synthetic.py</code> from project repo",
      "Build dataset: last 16 addresses + PC → next hit/miss",
      "Train/val/test split 70/15/15 maintaining temporal order"
    ],
    hw: "Temporal ordering matters for sequences — shuffling leaks future information into training. Like reading future cache patterns when making current decisions.",
    mentor: "Why must we NOT shuffle sequence data for train/test split? What would go wrong?"
  },
  {
    d: 28, title: "Makemore Part 1: character-level LM", phase: 2, badges: ["read", "code"],
    read: ["Watch Karpathy makemore Part 1 — watch AND code along"],
    code: [
      "Build the bigram model from scratch — don't copy-paste",
      "Build the MLP version",
      "Markdown: 'character→next character is structurally identical to address→cache hit/miss because...'"
    ],
    hw: "The sequence prediction Karpathy builds here is structurally identical to your cache predictor. The only difference is the domain.",
    mentor: "Explain the connection between character-level LM and cache miss prediction. What's the same and what's different?"
  },
  {
    d: 29, title: "Makemore Part 2: MLP + batch norm", phase: 2, badges: ["read", "code"],
    read: ["Watch Karpathy makemore Part 2"],
    code: [
      "Implement batch normalization from scratch (before using nn.BatchNorm1d)",
      "Understand the dead neuron problem",
      "Plot activation distributions across layers during training"
    ],
    hw: "NVIDIA Nsight Compute shows per-layer utilization metrics for GPU kernels. A kernel at 2% occupancy is like a dead neuron — same diagnostic thinking.",
    mentor: "What is the dead neuron problem and how does batch normalization help prevent it?"
  },
  {
    d: 30, title: "Makemore Part 3: activations & init", phase: 2, badges: ["read", "code"],
    read: ["Watch Karpathy makemore Part 3"],
    code: [
      "Implement Kaiming initialization",
      "Plot activation distributions with and without proper init",
      "Does your LSTM have any saturated layers? Check with hooks."
    ],
    hw: "Kaiming initialization was designed specifically for ReLU activations. Apple's Neural Engine has different quantization requirements that change init strategy.",
    mentor: "Why does weight initialization matter? What goes wrong with all-zeros initialization?"
  },
  {
    d: 31, title: "Makemore Part 4: hierarchical sequences", phase: 2, badges: ["read", "code"],
    read: ["Watch Karpathy makemore Part 4"],
    code: [
      "Implement hierarchical sequence processing",
      "How do you model long-range dependencies in memory access traces?",
      "Compare: LSTM vs WaveNet-style for cache dataset"
    ],
    hw: "Long-range dependencies come from loop structures — a cache-thrashing loop might repeat every 1000 accesses. WaveNet-style can capture this.",
    mentor: "What's the advantage of hierarchical processing over flat sequence processing for long traces?"
  },
  {
    d: 32, title: "Transformers: what Apple uses on-device", phase: 2, badges: ["read", "code"],
    read: [
      "Read fully: jalammar.github.io/illustrated-transformer/",
      "Attention Is All You Need — abstract + section 3 only"
    ],
    code: [
      "Implement <code>scaled_dot_product_attention</code> from scratch",
      "Verify: for seq length 4, attention matrix is 4×4",
      "Visualize attention weights: which past addresses attend to which?",
      "Apply to memory access sequence"
    ],
    hw: "Apple's Neural Engine runs transformer-based models for Siri, autocorrect, and health sensing. Attention is the core mechanism — required for Apple AIML roles.",
    mentor: "Why does attention need the <code>1/sqrt(d_k)</code> scaling factor? What happens without it?"
  },
  {
    d: 33, title: "GPU memory model: PyTorch on the GPU", phase: 2, badges: ["read", "code"],
    read: [
      "PyTorch blog: Understanding GPU memory (pytorch.org/blog)",
      "NVIDIA CUDA programming guide — memory hierarchy section only"
    ],
    code: [
      "<code>torch.cuda.memory_allocated()</code> and <code>memory_reserved()</code>",
      "Profile LSTM with <code>torch.profiler</code>",
      "Top 3 most expensive operations",
      "Table: operation | time (ms) | % total | memory (MB)"
    ],
    hw: "Your ECE background is the advantage here. GPU L1/L2/HBM follows the same principles as CPU cache hierarchies, just parallelized across 10,000 cores.",
    mentor: "What's the difference between GPU global memory, shared memory, and registers? Map these to L3, L2, and L1 cache."
  },
  {
    d: 34, title: "Assignment 5: LSTM cache predictor v1", phase: 2, badges: ["assign"],
    read: ["No new reading"],
    code: [
      "Full LSTM with 2 layers, proper dropout",
      "Baseline: 'always predict hit' accuracy",
      "Target: >70% accuracy on held-out sequences",
      "Training plot: loss + accuracy for train and val",
      "Error analysis: 5 wrong predictions with hypothesis",
      "GPU profiling table from Day 33"
    ],
    hw: "If 90% of accesses are hits, a 91% LSTM isn't impressive. Always report improvement over the right baseline.",
    mentor: "Baseline 'always predict hit' gives X%. Your LSTM gives Y%. Is the improvement worth the added complexity? Justify."
  },
  {
    d: 35, title: "Feature engineering for sequences", phase: 2, badges: ["code"],
    read: ["Hawkeye paper pages 3–5 — OPTgen algorithm"],
    code: [
      "Implement <code>compute_reuse_distance()</code>",
      "Implement <code>compute_strides()</code>",
      "Implement <code>pc_signature()</code>",
      "Retrain LSTM with richer features",
      "SHAP on new features — which is most predictive?"
    ],
    hw: "Raw memory addresses are weak features — they change between runs. Reuse distance captures the pattern: high reuse distance means the address was evicted.",
    mentor: "Why is reuse distance a better feature than raw address? What hardware mechanism does it capture?"
  },
  {
    d: 36, title: "LRU vs ML: head-to-head comparison", phase: 2, badges: ["code"],
    read: ["Review Belady's algorithm — Wikipedia is fine"],
    code: [
      "Complete <code>LRUCache.access()</code>",
      "Complete <code>OPTCache._precompute_next_use()</code> and <code>.access()</code>",
      "Run both on the same trace",
      "Plot: cumulative hit rate over time for both",
      "Table: LRU hit rate | ML hit rate | OPT hit rate | % of OPT achieved"
    ],
    hw: "OPT is the theoretical ceiling — it knows the future. Your ML approaches OPT without future knowledge. The gap quantifies remaining improvement.",
    mentor: "OPT achieves X% and LRU achieves Y%. If your ML achieves Z%, what % of the theoretical gap have you closed?"
  },
  {
    d: 37, title: "Model optimization: make it fast", phase: 2, badges: ["code"],
    read: ["Skim PyTorch quantization tutorial"],
    code: [
      "INT8 quantization: <code>torch.quantization.quantize_dynamic(model, {nn.LSTM, nn.Linear}, dtype=torch.qint8)</code>",
      "Knowledge distillation: train small MLP to mimic LSTM",
      "TorchScript: <code>torch.jit.script(model)</code>",
      "Comparison table: model | latency (µs) | accuracy (%) | size (KB)"
    ],
    hw: "A cache replacement predictor must run in ~1 nanosecond to be practical. A full LSTM is too slow. This is what Apple's Neural Engine solves.",
    mentor: "Your quantized model lost X% accuracy. Is that acceptable? What's the trade-off in hardware deployment terms?"
  },
  {
    d: 38, title: "Capstone report: write the skeleton", phase: 2, badges: ["code"],
    read: [
      "IEEE paper format guide — skim once",
      "Glider paper arXiv 1906.03861 — abstract + sections 1–2"
    ],
    code: [
      "Open <code>project1-cache-predictor/report/</code>",
      "Write Abstract (150 words)",
      "Write Introduction (500 words) — include arch mapping table from Day 10",
      "Write Related Work — cite Hawkeye, Glider, LSTM prefetcher",
      "Write Methodology skeleton with architecture diagram placeholder"
    ],
    hw: "Your introduction should be readable by both an ML engineer and a computer architect. The arch mapping table from Day 10 bridges both audiences.",
    mentor: "Read me your abstract out loud. Does it answer: what did you do, how, and what result?"
  },
  {
    d: 39, title: "Capstone figures and results", phase: 2, badges: ["code"],
    read: ["No reading"],
    code: [
      "Generate 5 required figures with proper labels and captions:",
      "1. System architecture diagram",
      "2. Training curves (loss + accuracy)",
      "3. Hit rate comparison bar chart: LRU vs ML vs OPT",
      "4. SHAP summary plot for top 5 features",
      "5. Latency comparison table",
      "All figures saved as .png at 300 DPI"
    ],
    hw: "Every claim must be supported by a number. 'Our method performs better' is not a result. 'Our method achieves 8% higher hit rate (p<0.05)' is.",
    mentor: "Point to your most important figure. What's the single most important thing it shows and why?"
  },
  {
    d: 40, title: "Assignment 6: paper-quality results", phase: 2, badges: ["assign"],
    read: ["No reading"],
    code: [
      "Produce <code>results.md</code> with all tables and figures",
      "Every result: mean ± std over 3 independent runs",
      "Statistical significance: t-test between LRU and ML hit rates",
      "A clear 'win': ML beats LRU on at least 1 benchmark by a meaningful margin"
    ],
    hw: "3 independent runs with mean ± std is the minimum bar for publishable results. If you can't show this, you don't know if your result is real.",
    mentor: "Your ML policy beats LRU by X%. Is that result statistically significant? Show me the test."
  },
  {
    d: 41, title: "Clean code sprint", phase: 3, badges: ["code"],
    read: ["No reading — engineering day"],
    code: [
      "Move all working code into <code>src/</code> modules",
      "Complete TODOs in <code>model.py</code>, <code>policies.py</code>, <code>features.py</code>",
      "File structure: dataset.py, model.py, policies.py, features.py, train.py",
      "All functions must have docstrings",
      "No magic numbers — use named constants or config dict"
    ],
    hw: "Clean code is a professional signal. When a NVIDIA engineer reviews your GitHub, they check whether the code looks like production or a student notebook.",
    mentor: "Walk me through your <code>model.py</code> line by line. Explain every design choice."
  },
  {
    d: 42, title: "Tests and reproducibility", phase: 3, badges: ["code"],
    read: ["Skim pytest documentation — 10 min"],
    code: [
      "Write <code>test_policies.py</code>: at least 5 tests for LRUCache and OPTCache",
      "LRU test: verify it evicts the correct line",
      "OPT test: verify it achieves higher hit rate than LRU",
      "<code>pytest tests/</code> — all green"
    ],
    hw: "Tests for cache policies are like design verification for RTL — checking that logic is correct before trusting results. Same principle, different layer.",
    mentor: "Show me your LRU correctness test. How did you decide what to test?"
  },
  {
    d: 43, title: "Experiment reproducibility", phase: 3, badges: ["code"],
    read: ["No reading"],
    code: [
      "<code>compare_policies.py</code>: run in <5 min on Kaggle GPU",
      "Accepts <code>--trace_path</code>, <code>--cache_size</code>, <code>--model_path</code>",
      "Save results to <code>results/run_{timestamp}.json</code>",
      "Test: delete cached outputs, run from scratch — same numbers?"
    ],
    hw: "Reproducibility is the difference between research and a demo. If someone can't run your code and get your numbers, the result doesn't exist.",
    mentor: "Delete all your .pt model files. Run from scratch. How long did it take? Are the numbers the same?"
  },
  {
    d: 44, title: "The README that gets you hired", phase: 3, badges: ["code"],
    read: ["Look at 3 repos with 1000+ stars — study their READMEs"],
    code: [
      "One-line description with your actual result number",
      "Results table AT THE TOP (before installation)",
      "Quickstart: 3 commands from git clone to running results",
      "Architecture diagram (ASCII or image)",
      "BibTeX citation entry — signals research maturity"
    ],
    hw: "Recruiters at NVIDIA and Apple spend 30 seconds on a GitHub repo. If they don't see results in the first scroll, they move on.",
    mentor: "I'm a NVIDIA recruiter. I have 30 seconds. What do I see when I open your repo?"
  },
  {
    d: 45, title: "IEEE report final draft", phase: 3, badges: ["code"],
    read: ["Skim one published IEEE paper on cache replacement"],
    code: [
      "Complete all sections of the report",
      "Every figure must have a caption",
      "Every table must have units",
      "Every claim supported by a number",
      "Total: 4–6 pages in IEEE two-column format",
      "Export as PDF"
    ],
    hw: "A 4-page IEEE report on ML cache replacement by a final-year ECE student is a legitimate research contribution. You could submit this to a student workshop.",
    mentor: "Read me your conclusion paragraph. Does it connect back to the problem you stated in the introduction?"
  },
  {
    d: 46, title: "Peer review with mentor", phase: 3, badges: ["hw"],
    read: ["No reading — review day"],
    code: [
      "Mentor reads the full report",
      "Defend: 'Why LSTM over transformer?'",
      "Defend: 'What if cache size doubled?'",
      "Defend: 'Which benchmark was hardest for your model?'",
      "Incorporate feedback into final version"
    ],
    hw: "Defending design choices is what separates an engineer from a student. Every question the mentor asks is one an Apple interviewer will ask.",
    mentor: "What's the weakest part of your paper? How would you fix it with 2 more weeks?"
  },
  {
    d: 47, title: "Build 10-slide presentation deck", phase: 3, badges: ["code"],
    read: ["No reading"],
    code: [
      "Slide 1: Title + one-line result (the number)",
      "Slide 2: Problem — why cache replacement matters",
      "Slide 3: Approach — LRU → features → LSTM",
      "Slide 6: Main result — hit rate comparison chart",
      "Slide 8: Latency analysis — is it practical?",
      "Slide 10: Next steps — leads to Project 2 CUDA"
    ],
    hw: "Slide 6 (your main result) is the only slide that matters. Every other slide exists to make slide 6 believable.",
    mentor: "You have 2 minutes. Convince me your ML cache predictor is worth deploying. Go."
  },
  {
    d: 48, title: "15-minute dry run", phase: 3, badges: ["hw"],
    read: ["No reading"],
    code: [
      "Present full 10 slides to mentor — timed",
      "Hard limit: 15 minutes",
      "Mentor asks one hard question — answer in <2 min",
      "Record yourself if mentor unavailable — watch it back"
    ],
    hw: "NVIDIA and Apple technical interviews often include a 15-minute project presentation. This day is direct interview prep.",
    mentor: "[After the presentation] What would you cut if you had only 5 minutes?"
  },
  {
    d: 49, title: "Final submission checklist", phase: 3, badges: ["code"],
    read: ["No reading — shipping day"],
    code: [
      "All code runs: <code>python experiments/compare_policies.py</code>",
      "All tests pass: <code>pytest tests/</code>",
      "Report PDF committed to repo",
      "GitHub repo is PUBLIC",
      "Commit history spans all 50 days",
      "requirements.txt complete and tested",
      "Share repo URL with mentor"
    ],
    hw: "Shipping something finished with tests and documentation is rarer than you think. Most student projects only work on their creator's laptop.",
    mentor: "Show me the commit history. Is there evidence of 50 days of work?"
  },
  {
    d: 50, title: "Project 2 kickoff + reflection", phase: 3, badges: ["hw"],
    read: [
      "Open <code>projects/project2-cuda-gemm/README.md</code>",
      "Read Infatoshi cuda-course README (github.com/Infatoshi/cuda-course)"
    ],
    code: [
      "No new code today — planning day",
      "Journal: most important thing learned in 50 days?",
      "Journal: which ML concept maps most directly to ECE coursework?",
      "Journal: what question do you still not fully understand?",
      "Schedule: when does August CUDA project start?"
    ],
    hw: "You now have the ML foundation. The CUDA project in August is the differentiator that makes NVIDIA applications competitive.",
    mentor: "You've finished 50 days. What are you most proud of? What would you do differently?"
  }
];
