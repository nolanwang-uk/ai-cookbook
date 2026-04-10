export type Lang = "zh" | "en";

export interface Resource {
  name: { zh: string; en: string };
  url: string;
}

export interface ZhResource {
  name: string;
  url: string;
}

export interface Topic {
  id: string;
  title: { zh: string; en: string };
  difficulty: { zh: string; en: string };
  priority?: { zh: string; en: string };
  prereqs?: { zh: string; en: string };
  duration?: { zh: string; en: string };
  why?: { zh: string; en: string };
  concepts: { zh: string[]; en: string[] };
  resources: Resource[];
  zhResources?: ZhResource[];
}

export interface SubGroup {
  label: { zh: string; en: string };
  topics: Topic[];
}

export interface Section {
  id: string;
  title: { zh: string; en: string };
  emoji: string;
  phase: { zh: string; en: string };
  description: { zh: string; en: string };
  tip?: { zh: string; en: string };
  subgroups: SubGroup[];
}

export const siteTitle = {
  zh: "AI 学习手册",
  en: "AI Learning Cookbook",
};

export const siteSubtitle = {
  zh: "从数学基础到前沿研究，系统性的人工智能学习路线图",
  en: "A systematic roadmap from math foundations to cutting-edge AI research",
};

/* ════════════════════════════════════════
   ROADMAP  — shown first on the page
   ════════════════════════════════════════ */

export const roadmapPhases = {
  title: { zh: "你的学习旅程", en: "Your Learning Journey" },
  phases: [
    {
      phase: { zh: "起步", en: "Start" },
      label: { zh: "打基础", en: "Build Foundation" },
      duration: { zh: "3-5 个月", en: "3-5 months" },
      desc: {
        zh: "掌握必要的数学基础，学会机器学习核心算法，熟悉 Python 数据科学工具链。",
        en: "Master essential math, learn core ML algorithms, and get comfortable with Python data science tools.",
      },
      color: "indigo",
    },
    {
      phase: { zh: "进阶", en: "Level Up" },
      label: { zh: "深入深度学习", en: "Go Deep" },
      duration: { zh: "3-5 个月", en: "3-5 months" },
      desc: {
        zh: "理解神经网络从感知器到 Transformer 的完整体系，能独立搭建和训练模型。",
        en: "Understand neural networks from perceptrons to Transformers. Build and train models independently.",
      },
      color: "violet",
    },
    {
      phase: { zh: "选方向", en: "Specialize" },
      label: { zh: "选择专攻方向", en: "Choose Your Path" },
      duration: { zh: "2-3 个月", en: "2-3 months" },
      desc: {
        zh: "NLP/大语言模型、计算机视觉、强化学习 —— 选一个深入，其他了解即可。",
        en: "NLP/LLMs, Computer Vision, or Reinforcement Learning — go deep in one, survey the others.",
      },
      color: "blue",
    },
    {
      phase: { zh: "落地", en: "Ship It" },
      label: { zh: "让技术落地", en: "Make It Real" },
      duration: { zh: "2-4 个月", en: "2-4 months" },
      desc: {
        zh: "提示工程、RAG、微调、MLOps —— 把模型变成产品的关键技能。",
        en: "Prompt engineering, RAG, fine-tuning, MLOps — the skills that turn models into products.",
      },
      color: "emerald",
    },
    {
      phase: { zh: "前沿", en: "Frontier" },
      label: { zh: "探索前沿方向", en: "Push the Frontier" },
      duration: { zh: "持续", en: "Ongoing" },
      desc: {
        zh: "生成式 AI、多模态、AI 智能体、安全与对齐 —— 这是一个不断进化的领域。",
        en: "Generative AI, multi-modal, AI agents, safety & alignment — a continuously evolving field.",
      },
      color: "amber",
    },
  ],
  total: {
    zh: "从零到扎实基础约需 12-18 个月专注学习",
    en: "~12-18 months of dedicated study from zero to strong foundations",
  },
};

/* ════════════════════════════════════════
   MATH DEPENDENCY — inlined in Phase 0
   ════════════════════════════════════════ */

export const mathDependency = {
  title: { zh: "数学学习依赖图", en: "Math Dependency Graph" },
  note: {
    zh: "最小可行数学（开始写 ML 代码）：线性代数基础 + 导数/链式法则 + 概率基础，约 4-8 周。\n完整数学基础（阅读论文）：以上全部，约 3-6 个月。",
    en: "Minimum viable math (start coding ML): linear algebra basics + derivatives/chain rule + probability fundamentals, ~4-8 weeks.\nFull math foundation (read papers): all of the above, ~3-6 months.",
  },
};

/* ════════════════════════════════════════
   SECTIONS — organized by learning phase
   ════════════════════════════════════════ */

export const sections: Section[] = [
  /* ── Phase 0-1: Foundation ── */
  {
    id: "foundation",
    title: { zh: "打基础", en: "Build Your Foundation" },
    emoji: "🧱",
    phase: { zh: "起步 · 3-5 个月", en: "Start · 3-5 months" },
    description: {
      zh: "先学数学，再学算法。数学不需要学到博士水平 —— 掌握下面这些「刚好够用」的核心知识就能开始。",
      en: "Math first, then algorithms. You don't need a PhD level — just master the \"just enough\" core knowledge below to get started.",
    },
    tip: {
      zh: "💡 如果你急于动手：先学线性代数 + 导数链式法则 + 概率基础（4-8周），就可以边学 ML 边补数学。",
      en: "💡 In a rush? Learn linear algebra + chain rule + probability basics (~4-8 weeks), then learn ML while filling gaps.",
    },
    subgroups: [
      {
        label: { zh: "必备数学", en: "Essential Math" },
        topics: [
          {
            id: "linear-algebra",
            title: { zh: "线性代数", en: "Linear Algebra" },
            difficulty: { zh: "入门-中级", en: "Beginner-Intermediate" },
            priority: { zh: "🔴 关键", en: "🔴 CRITICAL" },
            duration: { zh: "3-4 周", en: "3-4 weeks" },
            why: {
              zh: "数据以向量/矩阵/张量表示。神经网络的前向传播就是矩阵乘法。PCA、嵌入和注意力机制都依赖线性代数。",
              en: "Data is represented as vectors/matrices/tensors. Neural network forward passes are matrix multiplications. PCA, embeddings, and attention mechanisms all rely on linear algebra.",
            },
            concepts: {
              zh: [
                "向量、向量空间与子空间",
                "矩阵运算（加法、乘法、转置、逆矩阵）",
                "线性方程组与高斯消元",
                "线性变换与基变换",
                "特征值与特征向量（PCA、谱方法）",
                "矩阵分解：SVD、LU、QR、Cholesky",
                "范数（L1、L2、Frobenius）与距离度标",
                "正交性、投影与最小二乘法",
                "正定矩阵与二次型",
                "张量运算（深度学习框架基础）",
              ],
              en: [
                "Vectors, vector spaces, and subspaces",
                "Matrix operations (addition, multiplication, transpose, inverse)",
                "Systems of linear equations and Gaussian elimination",
                "Linear transformations and change of basis",
                "Eigenvalues and eigenvectors (PCA, spectral methods)",
                "Matrix decompositions: SVD, LU, QR, Cholesky",
                "Norms (L1, L2, Frobenius) and distance metrics",
                "Orthogonality, projections, and least squares",
                "Positive definite matrices and quadratic forms",
                "Tensor operations (for deep learning frameworks)",
              ],
            },
            resources: [
              { name: { zh: "《机器学习数学》Deisenroth 等（免费 PDF）第 2-4 章", en: "Mathematics for Machine Learning by Deisenroth et al. (free PDF) Ch 2-4" }, url: "https://mml-book.github.io/book/mml-book.pdf" },
              { name: { zh: "MIT 18.06 线性代数 — Gilbert Strang 讲座（YouTube）", en: "MIT 18.06 Linear Algebra — Gilbert Strang lectures (YouTube)" }, url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP63oMNUHXqIUcrkS2PivhN3k" },
              { name: { zh: "3BlueBrown「线性代数的本质」系列视频", en: "3BlueBrown 'Essence of Linear Algebra' video series" }, url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
              { name: { zh: "Coursera: 机器学习数学：线性代数（帝国理工学院）", en: "Coursera: Mathematics for ML: Linear Algebra (Imperial College)" }, url: "https://www.coursera.org/learn/linear-algebra-machine-learning" },
            ],
            zhResources: [
              { name: "MIT 18.06 线性代数 Gilbert Strang（中英双语字幕·B站）", url: "https://www.bilibili.com/video/BV1b7411f7sK/" },
              { name: "宋浩《线性代数》教学视频（B站）", url: "https://www.bilibili.com/video/BV1aW411Q7x1/" },
              { name: "3BlueBrown 线性代数的本质（官方双语合集·B站）", url: "https://www.bilibili.com/video/BV1ys411472E/" },
            ],
          },
          {
            id: "calculus",
            title: { zh: "微积分", en: "Calculus" },
            difficulty: { zh: "入门-中级", en: "Beginner-Intermediate" },
            priority: { zh: "🔴 关键", en: "🔴 CRITICAL" },
            duration: { zh: "3-4 周", en: "3-4 weeks" },
            why: {
              zh: "训练任何模型意味着计算梯度。反向传播就是链式法则应用于计算图。理解损失函数曲面需要多元微积分。",
              en: "Training any model means computing gradients. Backpropagation is the chain rule applied through a computational graph.",
            },
            concepts: {
              zh: [
                "导数与微积分法则（链式法则对反向传播最重要）",
                "偏导数",
                "积分（概念理解）",
                "泰勒级数与近似",
                "梯度（偏导数向量）— 所有优化的核心",
                "雅可би矩阵",
                "海森矩阵（二阶优化）",
                "方向导数",
                "多维链式法则（反向传播的本质）",
              ],
              en: [
                "Derivatives and differentiation rules (chain rule is key for backpropagation)",
                "Partial derivatives",
                "Integrals (conceptual understanding)",
                "Taylor series and approximations",
                "Gradients (vector of partial derivatives) — core of all optimization",
                "Jacobian matrices",
                "Hessian matrices (second-order optimization)",
                "Directional derivatives",
                "The chain rule in multiple dimensions (backpropagation is literally this)",
              ],
            },
            resources: [
              { name: { zh: "《机器学习数学》第 5 章", en: "Mathematics for Machine Learning — Chapter 5" }, url: "https://mml-book.github.io/book/mml-book.pdf" },
              { name: { zh: "Khan Academy 多元微积分（免费）", en: "Khan Academy Multivariable Calculus (free)" }, url: "https://www.khanacademy.org/math/multivariable-calculus" },
              { name: { zh: "MIT 18.02 多元微积分（OpenCourseWare）", en: "MIT 18.02 Multivariable Calculus (OpenCourseWare)" }, url: "https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/" },
              { name: { zh: "Coursera: 机器学习数学：多元微积分（帝国理工学院）", en: "Coursera: Mathematics for ML: Multivariate Calculus (Imperial College)" }, url: "https://www.coursera.org/learn/multivariate-calculus-machine-learning" },
            ],
            zhResources: [
              { name: "高等数学（同济版）视频课程（B站）", url: "https://www.bilibili.com/video/BV1b2421M7hd/" },
              { name: "宋浩老师高等数学教学视频", url: "https://songhaomath.com/" },
            ],
          },
          {
            id: "probability",
            title: { zh: "概率与统计", en: "Probability & Statistics" },
            difficulty: { zh: "中级", en: "Intermediate" },
            priority: { zh: "🔴 关键", en: "🔴 CRITICAL" },
            duration: { zh: "3-4 周", en: "3-4 weeks" },
            why: {
              zh: "机器学习本质地是从数据中学习概率分布。损失函数通常来源于最大似然估计。贝叶斯思维支撑着许多现代方法。",
              en: "ML is fundamentally about learning probability distributions from data. Loss functions are often derived from MLE.",
            },
            concepts: {
              zh: ["概率公理、条件概率、贝叶斯定理", "随机变量（离散与连续）", "常见分布：正态、伯努利、泊松、均匀分布等", "期望、方差、协方异与相关性", "联合、边际与条件分布", "最大似似估计（MLE）与最大后验估计（MAP）", "贝叶斯推断基础", "假设检验与置信区间", "采样方法（蒙特卡洛、MCMC 基础）"],
              en: ["Probability axioms, conditional probability, Bayes' theorem", "Random variables (discrete and continuous)", "Common distributions: Gaussian, Bernoulli, Poisson, Uniform, etc.", "Expectation, variance, covariance, and correlation", "Joint, marginal, and conditional distributions", "Maximum Likelihood Estimation (MLE) and MAP", "Bayesian inference fundamentals", "Hypothesis testing and confidence intervals", "Sampling methods (Monte Carlo, MCMC basics)"],
            },
            resources: [
              { name: { zh: "《All of Statistics》Larry Wasserman（简洁、ML 导向）", en: "All of Statistics by Larry Wasserman (concise, ML-focused)" }, url: "https://link.springer.com/book/10.1007/978-0-387-21736-9" },
              { name: { zh: "Harvard Stat 110（YouTube — Joe Blitzstein 讲座）", en: "Harvard Stat 110 (YouTube — Joe Blitzstein lectures)" }, url: "https://www.youtube.com/playlist?list=PLLVplP8OIVc8EktkrD3Q8td0GmId7DjW0" },
              { name: { zh: "《模式识别与机器学习》Bishop 第 1-2 章", en: "Pattern Recognition and Machine Learning by Bishop Ch 1-2" }, url: "https://www.microsoft.com/en-us/research/wp-content/uploads/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf" },
            ],
            zhResources: [
              { name: "宋浩《概率论与数理统计》教学视频（B站）", url: "https://www.bilibili.com/video/BV1ot411y7mU/" },
              { name: "陈希孺《概率论与数理统计》", url: "https://book.douban.com/subject/2201479/" },
            ],
          },
          {
            id: "optimization",
            title: { zh: "最优化", en: "Optimization" },
            difficulty: { zh: "中级", en: "Intermediate" },
            priority: { zh: "🟠 高", en: "🟠 HIGH" },
            duration: { zh: "2-3 周", en: "2-3 weeks" },
            why: { zh: "训练任何模型意味着一个优化问题。理解优化器行为对于调试训练和选择超参数至极重要。", en: "Training any model is an optimization problem. Understanding optimizer behavior is critical for debugging and hyperparameter tuning." },
            concepts: {
              zh: ["目标/损失函数、极小值与极大值", "梯度下降（批量、随机、小批量）", "学习率调度与自适应方法（Adam、AdaGrad、RMSProp）", "凸优化 vs 非凸优化", "约束优化与拉格朗日乘子法", "收ход分析基础", "正则化作为优化约束（L1/L2）"],
              en: ["Objective/loss functions, minima and maxima", "Gradient descent (batch, stochastic, mini-batch)", "Learning rate schedules and adaptive methods (Adam, AdaGrad, RMSProp)", "Convex vs. non-convex optimization", "Constrained optimization and Lagrange multipliers", "Convergence analysis basics", "Regularization as optimization constraint (L1/L2)"],
            },
            resources: [
              { name: { zh: "《凸优化》Boyd & Vandenbergne（免费 PDF）第 1-5 章", en: "Convex Optimization by Boyd & Vandenbergne (free PDF) Ch 1-5" }, url: "https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf" },
              { name: { zh: "Stanford CS229 讲义（优化部分）", en: "Stanford CS229 Lecture Notes (optimization sections)" }, url: "https://cs229.stanford.edu/main_notes.pdf" },
            ],
            zhResources: [
              { name: "Boyd 斯坦福凸优化公开课（中文字幕·B站）", url: "https://www.bilibili.com/video/av837646777/" },
              { name: "上海交大《最优化方法》18讲视频教程（B站）", url: "https://www.bilibili.com/video/av14666879/" },
            ],
          },
          {
            id: "info-theory",
            title: { zh: "信息论", en: "Information Theory" },
            difficulty: { zh: "中级-高级", en: "Intermediate-Advanced" },
            priority: { zh: "🟡 中等", en: "🟡 MEDIUM" },
            duration: { zh: "1-2 周", en: "1-2 weeks" },
            why: { zh: "交叉熵损失源自信息论。KL 散度出现在 VAE、RLHF 和许多正则化技术中。", en: "Cross-entropy loss comes from information theory. KL divergence appears in VAEs, RLHF, and many regularization techniques." },
            concepts: {
              zh: ["熵（香农熵）— 衡量不确定性", "交叉熵 — 最常见的分类损失函数", "KL 散度 — 衡量分布差异（VAE、策略优化）", "互信息 — 特征选择、表示学习", "信息增益 — 决策树"],
              en: ["Entropy (Shannon entropy) — measures uncertainty", "Cross-entropy — the most common classification loss", "KL Divergence — measures distribution difference (VAEs, policy optimization)", "Mutual information — feature selection, representation learning", "Information gain — decision trees"],
            },
            resources: [
              { name: { zh: "《信息论、推理与学习算法》David MacKay（免费 PDF）", en: "Information Theory, Inference, and Learning Algorithms by David MacKay (free PDF)" }, url: "https://www.inference.org.uk/itprnn/book.pdf" },
              { name: { zh: "《动手学深度学习》信息论附录", en: "Dive into Deep Learning — Information Theory appendix" }, url: "https://d2l.ai/" },
            ],
            zhResources: [
              { name: "同济大学《信息论基础》全36讲（B站）", url: "https://www.bilibili.com/video/BV1pt41147eM/" },
              { name: "清华大学《应用信息论基础》（学堂在线）", url: "https://next.xuetangx.com/learn/THU08071000428/THU08071000428/1515671/video/1352169" },
            ],
          },
        ],
      },
      {
        label: { zh: "编程基础", en: "Programming Basics" },
        topics: [
          {
            id: "python-basics",
            title: { zh: "Python 基础与数据科学", en: "Python Basics & Data Science" },
            difficulty: { zh: "入门", en: "Beginner" },
            priority: { zh: "🔴 关键", en: "🔴 CRITICAL" },
            duration: { zh: "4-6 周", en: "4-6 weeks" },
            why: {
              zh: "Python 是 AI/机器学习的主流语言。掌握数据科学栈是实践 ML 的基础。",
              en: "Python is the dominant language for AI/ML. Mastering the data science stack is essential for practical ML work.",
            },
            concepts: {
              zh: [
                "Python 语法基础：变量、控制流、函数",
                "NumPy：数组操作、广播、线性代数",
                "Pandas：数据处理、清洗、分析",
                "数据可视化：Matplotlib、Seaborn、Plotly",
                "Jupyter Notebook/Lab：交互式计算环境",
                "基础算法与复杂度：排序、搜索、时间复杂度",
              ],
              en: [
                "Python syntax basics: variables, control flow, functions",
                "NumPy: array operations, broadcasting, linear algebra",
                "Pandas: data manipulation, cleaning, analysis",
                "Data visualization: Matplotlib, Seaborn, Plotly",
                "Jupyter Notebook/Lab: interactive computing environment",
                "Basic algorithms & complexity: sorting, searching, time complexity",
              ],
            },
            resources: [
              { name: { zh: "《Python for Data Analysis》Wes McKinney", en: "Python for Data Analysis by Wes McKinney" }, url: "https://wesmckinney.com/book/" },
              { name: { zh: "Kaggle Learn（免费微课程）", en: "Kaggle Learn (free micro-courses)" }, url: "https://www.kaggle.com/learn" },
              { name: { zh: "Coursera: Python for Everybody", en: "Coursera: Python for Everybody" }, url: "https://www.coursera.org/specializations/python" },
              { name: { zh: "fast.ai 编程入门", en: "fast.ai Programming Intro" }, url: "https://github.com/fastai/numerical-linear-algebra/blob/master/README.md" },
              { name: { zh: "DeepLearning.AI 课程", en: "DeepLearning.AI Courses" }, url: "https://www.deeplearning.ai/courses/" },
            ],
            zhResources: [
              { name: "莫烦 Python 数据处理教程（Numpy/Pandas）", url: "https://zhuanlan.zhihu.com/p/130435580" },
              { name: "北京大学《程序设计入门》（中国大学MOOC）", url: "https://www.icourse163.org/course/PKU-1001894005" },
              { name: "浙江大学《程序设计入门（Python）》", url: "https://www.icourse163.org/course/ZJU-1003101001" },
              { name: "李宏毅《机器学习》编程实践（B站）", url: "https://www.bilibili.com/video/BV1TAtwzTE1S/" },
            ],
          },
          {
            id: "ml-programming",
            title: { zh: "机器学习编程", en: "ML Programming" },
            difficulty: { zh: "入门-中级", en: "Beginner-Intermediate" },
            duration: { zh: "4-6 周", en: "4-6 weeks" },
            prereqs: { zh: "Python 基础、数学基础", en: "Python basics, math foundations" },
            concepts: {
              zh: [
                "NumPy 高级：广播规则、数组操作",
                "Scikit-learn：经典机器学习算法实现",
                "机器学习管道：数据预处理、训练、评估",
                "交叉验证与超参数调优",
                "模型持久化：保存/加载模型",
                "基础实验追踪：MLflow、Weights & Biases",
              ],
              en: [
                "NumPy advanced: broadcasting rules, array operations",
                "Scikit-learn: classic ML algorithm implementations",
                "ML pipeline: data preprocessing, training, evaluation",
                "Cross-validation & hyperparameter tuning",
                "Model persistence: saving/loading models",
                "Basic experiment tracking: MLflow, Weights & Biases",
              ],
            },
            resources: [
              { name: { zh: "《Hands-On ML》Aurelien Geron 第 3 版", en: "Hands-On ML by Aurelien Geron (3rd edition)" }, url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/" },
              { name: { zh: "fast.ai 实用深度学习（部分）", en: "fast.ai Practical Deep Learning (selected)" }, url: "https://course.fast.ai/" },
              { name: { zh: "Coursera: DeepLearning.AI 专项课程", en: "Coursera: DeepLearning.AI Specializations" }, url: "https://www.deeplearning.ai/courses/" },
              { name: { zh: "Scikit-learn 官方教程", en: "Scikit-learn Official Tutorials" }, url: "https://scikit-learn.org/stable/tutorial/index.html" },
              { name: { zh: "fast.ai 编程入门", en: "fast.ai Programming Intro" }, url: "https://github.com/fastai/numerical-linear-algebra/blob/master/README.md" },
            ],
            zhResources: [
              { name: "吴恩达《机器学习》编程作业（Coursera）", url: "https://www.coursera.org/learn/machine-learning" },
              { name: "李宏毅《机器学习》编程实践（B站）", url: "https://www.bilibili.com/video/BV1TAtwzTE1S/" },
              { name: "Datawhale 机器学习入门（开源教程）", url: "https://github.com/datawhalechina/pumpkin-book" },
              { name: "fast.ai 中文社区", url: "https://forums.fast.ai/" },
            ],
          },
        ],
      },
    ],
  },

  /* ── Phase 3: Specialize ── */
  {
    id: "specialize",
    title: { zh: "选择专攻方向", en: "Choose Your Path" },
    emoji: "🔀",
    phase: { zh: "选方向 · 2-3 个月", en: "Specialize · 2-3 months" },
    description: {
      zh: "不需要全学 —— 选一个你最感兴趣的方向深入，其他方向了解概念即可。大多数人选 NLP/LLM 或计算机视觉。",
      en: "You don't need to learn everything — pick the direction that interests you most and go deep. Most people choose NLP/LLMs or Computer Vision.",
    },
    tip: {
      zh: "🎯 2025-2026 最热门方向：NLP/大语言模型。如果不确定选什么，从这里开始。",
      en: "🎯 Hottest direction in 2025-2026: NLP/LLMs. If unsure, start here.",
    },
    subgroups: [
      {
        label: { zh: "选一个深入", en: "Pick One to Go Deep" },
        topics: [
          {
            id: "nlp-llm",
            title: { zh: "NLP 与大语言模型", en: "NLP & Large Language Models" },
            difficulty: { zh: "中级-高级", en: "Intermediate-Advanced" },
            prereqs: { zh: "深度学习（尤其 Transformer）", en: "Deep Learning (especially Transformers)" },
            duration: { zh: "3-6 个月", en: "3-6 months" },
            concepts: {
              zh: ["文本预处理：分词（BPE、WordPiece、SentencePiece）", "词嵌入：Word2Vec、GloVe、FastText", "注意力机制深入（「Attention Is All You Need」）", "BERT 与掩码语言建模", "GPT 系列与自回归语言建模", "缩放定律（Chinchilla 等）", "预训练、指令微调、对齐（RLHF、DPO、Constitutional AI）", "涌现能力与上下文学习", "思维链、思维树推理技术", "长上下文架构（RoPE、ALiBi、环形注意力）", "混合专家（MoE）架构", "效率优化：量化（GPTQ、AWQ）、蒸馏、剪枝、推测解码"],
              en: ["Text preprocessing: tokenization (BPE, WordPiece, SentencePiece)", "Word embeddings: Word2Vec, GloVe, FastText", "Attention mechanism deep dive ('Attention Is All You Need')", "BERT and masked language modeling", "GPT family and autoregressive language modeling", "Scaling laws (Chinchilla et al.)", "Pre-training, instruction tuning, alignment (RLHF, DPO, Constitutional AI)", "Emergent capabilities and in-context learning", "Chain-of-thought, tree-of-thought reasoning techniques", "Long-context architectures (RoPE, ALiBi, ring attention)", "Mixture of Experts (MoE) architectures", "Efficiency: quantization (GPTQ, AWQ), distillation, pruning, speculative decoding"],
            },
            resources: [
              { name: { zh: "Stanford CS224N: 深度学习自然语言处理", en: "Stanford CS224N: NLP with Deep Learning" }, url: "https://web.stanford.edu/class/cs224n/" },
              { name: { zh: "Hugging Face NLP 课程（免费、实践导向）", en: "Hugging Face NLP Course (free, hands-on)" }, url: "https://huggingface.co/learn/nlp-course" },
              { name: { zh: "Andrej Karpathy「从零构建 GPT」（YouTube）", en: "Andrej Karpathy 'Let's build GPT from scratch' (YouTube)" }, url: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
              { name: { zh: "Sebastian Raschka《从零构建大语言模型》", en: "Sebastian Raschka 'Build a Large Language Model (From Scratch)'" }, url: "https://github.com/rasbt/LLMs-from-scratch" },
              { name: { zh: "Jay Alammar 博客（Transformer、BERT、GPT 图解）", en: "Jay Alammar's blog (illustrated Transformer, BERT, GPT)" }, url: "https://jalammar.github.io/" },
            ],
            zhResources: [
              { name: "Awesome-Chinese-LLM：中文大语言模型资源汇总", url: "https://github.com/HqWu-HITCS/Awesome-Chinese-LLM" },
              { name: "OpenBMB × 清华NLP 大模型公开课", url: "https://hub.baai.ac.cn/view/19063" },
            ],
          },
          {
            id: "cv",
            title: { zh: "计算机视觉", en: "Computer Vision" },
            difficulty: { zh: "中级-高级", en: "Intermediate-Advanced" },
            prereqs: { zh: "深度学习（尤其 CNN）", en: "Deep Learning (especially CNNs)" },
            duration: { zh: "3-5 个月", en: "3-5 months" },
            concepts: {
              zh: ["图像分类：ResNet、EfficientNet、Vision Transformer (ViT)", "目标检测：YOLO 系列、DETR、Faster R-CNN", "语义/实例/全景分割：U-Net、Mask R-CNN、SAM", "自监督视觉学习：对比学习（SimCLR、CLIP、DINOv2）", "视频理解与视频 Transformer", "3D 视觉：NeRF、高斯溅射、点云处理", "多模态视觉-语言模型：CLIP、LLaVA、GPT-4V"],
              en: ["Image classification: ResNet, EfficientNet, Vision Transformer (ViT)", "Object detection: YOLO family, DETR, Faster R-CNN", "Segmentation: U-Net, Mask R-CNN, SAM (Segment Anything)", "Self-supervised visual learning: contrastive learning (SimCLR, CLIP, DINOv2)", "Video understanding and video transformers", "3D vision: NeRF, Gaussian splatting, point cloud processing", "Multi-modal vision-language models: CLIP, LLaVA, GPT-4V"],
            },
            resources: [
              { name: { zh: "Stanford CS231n: 深度学习计算机视觉", en: "Stanford CS231n: Deep Learning for Computer Vision" }, url: "https://cs231n.stanford.edu/" },
              { name: { zh: "Papers With Code（最新技术追踪）", en: "Papers With Code (state-of-the-art tracking)" }, url: "https://paperswithcode.com/" },
            ],
            zhResources: [
              { name: "斯坦福 CS231n 计算机视觉（中文字幕·B站）", url: "https://www.bilibili.com/video/BV1nJ411z7fe/" },
              { name: "CS231n 官方笔记中文翻译（知乎）", url: "https://zhuanlan.zhihu.com/p/21930884" },
            ],
          },
          {
            id: "rl",
            title: { zh: "强化学习", en: "Reinforcement Learning" },
            difficulty: { zh: "高级", en: "Advanced" },
            prereqs: { zh: "机器学习基础、深度学习、概率与统计", en: "ML Fundamentals, Deep Learning, Probability" },
            duration: { zh: "3-6 个月", en: "3-6 months" },
            concepts: {
              zh: ["马尔可夫决策过程（MDP）", "值函数、Q 函数、贝尔曼方程", "动态规划：策略迭代、值迭代", "时序差分学习：SARSA、Q-Learning", "策略梯度方法：REINFORCE、PPO、TRPO", "Deep Q-Networks（DQN）及扩展", "Actor-Critic 方法", "基于模型的 RL：世界模型、Dreamer、MuZero", "RLHF — 与大语言模型的交叉"],
              en: ["Markov Decision Processes (MDPs)", "Value functions, Q-functions, Bellman equations", "Dynamic programming: policy iteration, value iteration", "Temporal Difference learning: SARSA, Q-Learning", "Policy gradient methods: REINFORCE, PPO, TRPO", "Deep Q-Networks (DQN) and extensions", "Actor-Critic methods", "Model-based RL: world models, Dreamer, MuZero", "RLHF — intersection with LLMs"],
            },
            resources: [
              { name: { zh: "《强化学习导论》Sutton & Barto 第 2 版（免费 PDF）", en: "Reinforcement Learning: An Introduction by Sutton & Barto (free PDF)" }, url: "http://incompleteideas.net/book/the-book.html" },
              { name: { zh: "David Silver RL 课程（DeepMind, YouTube）", en: "David Silver's RL Course (DeepMind, YouTube)" }, url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ" },
              { name: { zh: "Hugging Face 深度 RL 课程（免费）", en: "Hugging Face Deep RL Course (free)" }, url: "https://huggingface.co/learn/deep-rl-course" },
            ],
            zhResources: [
              { name: "王树森《深度强化学习》（B站）", url: "https://www.bilibili.com/video/BV12o4y197US/" },
              { name: "蘑菇书 EasyRL：强化学习中文教程（Datawhale）", url: "https://datawhalechina.github.io/easy-rl/" },
            ],
          },
        ],
      },
    ],
  },

  /* ── Phase 4-5: Make It Real ── */
  {
    id: "make-real",
    title: { zh: "让技术落地", en: "Make It Real" },
    emoji: "🛠️",
    phase: { zh: "落地 · 2-4 个月", en: "Ship It · 2-4 months" },
    description: {
      zh: "能训练模型只是第一步。这个阶段学习把模型变成产品的关键技能：如何用好现有模型、如何微调、如何部署上线。",
      en: "Training models is just step one. This phase covers the skills that turn models into products: using existing models effectively, fine-tuning, and deploying to production.",
    },
    subgroups: [
      {
        label: { zh: "用好模型", en: "Using Models" },
        topics: [
          {
            id: "prompt-rag",
            title: { zh: "提示工程与 RAG", en: "Prompt Engineering & RAG" },
            difficulty: { zh: "入门-中级", en: "Beginner-Intermediate" },
            duration: { zh: "1-3 个月", en: "1-3 months" },
            why: { zh: "2026 共识：先做好提示工程和评测，再考虑 RAG，最后才考虑微调。", en: "2026 consensus: get prompt engineering and evals right first, then RAG, then fine-tuning." },
            concepts: {
              zh: ["零样本、少样本、多样本提示", "思维链提示与推理引导", "系统提示与角色设定", "结构化输出（JSON 模式）", "提示链与任务分解", "温度、top-p 等采样参数调优", "提示注入攻击与防御", "文档分块策略（固定大小、语义、递归）", "嵌入模型与向量数据库（Pinecone、Weaviate、Chroma）", "检索策略：稠密检索、稀疏检索（BM25）、混合检索", "重排序：交叉编码器", "高级 RAG：查询扩展、HyDE、GraphRAG"],
              en: ["Zero-shot, few-shot, and many-shot prompting", "Chain-of-thought prompting and reasoning elicitation", "System prompts and role setting", "Structured output (JSON mode)", "Prompt chaining and decomposition", "Temperature, top-p, and sampling parameter tuning", "Prompt injection attacks and defenses", "Document chunking strategies (fixed-size, semantic, recursive)", "Embedding models and vector databases (Pinecone, Weaviate, Chroma)", "Retrieval strategies: dense, sparse (BM25), hybrid", "Re-ranking: cross-encoders", "Advanced RAG: query expansion, HyDE, GraphRAG"],
            },
            resources: [
              { name: { zh: "OpenAI 提示工程指南", en: "OpenAI Prompt Engineering Guide" }, url: "https://platform.openai.com/docs/guides/prompt-engineering" },
              { name: { zh: "Anthropic 提示工程文档", en: "Anthropic Prompt Engineering documentation" }, url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
              { name: { zh: "LangChain / LlamaIndex 文档", en: "LangChain / LlamaIndex documentation" }, url: "https://docs.llamaindex.ai/en/stable/" },
              { name: { zh: "DeepLearning.AI 提示工程与 RAG 短课程", en: "DeepLearning.AI short courses on prompt engineering and RAG" }, url: "https://www.deeplearning.ai/courses/" },
            ],
            zhResources: [
              { name: "吴恩达《ChatGPT提示工程》中英字幕（B站）", url: "https://www.bilibili.com/video/BV1e8411o7NP/" },
              { name: "Datawhale LLM Cookbook：吴恩达大模型系列课程中文版", url: "https://github.com/datawhalechina/llm-cookbook" },
              { name: "面向开发者的 Prompt 工程（中文版）", url: "https://prompt-engineering.xiniushu.com/" },
            ],
          },
        ],
      },
      {
        label: { zh: "调优与部署", en: "Tuning & Deploying" },
        topics: [
          {
            id: "finetuning",
            title: { zh: "微调与 RLHF", en: "Fine-tuning & RLHF" },
            difficulty: { zh: "高级", en: "Advanced" },
            duration: { zh: "2-4 个月", en: "2-4 months" },
            concepts: {
              zh: ["全量微调 vs 参数高效微调（PEFT）", "LoRA 与 QLoRA", "适配器方法", "指令微调与数据集准备", "灾难性遗忘及缓解策略", "监督微调（SFT）", "RLHF 流水线：奖励模型训练、PPO 优化", "DPO（直接偏好优化）— 比 RLHF 更简单稳定", "Constitutional AI 与自我纠正机制"],
              en: ["Full fine-tuning vs parameter-efficient fine-tuning (PEFT)", "LoRA and QLoRA", "Adapter methods", "Instruction tuning and dataset preparation", "Catastrophic forgetting and mitigation", "Supervised Fine-Tuning (SFT)", "RLHF pipeline: reward model training, PPO optimization", "DPO (Direct Preference Optimization) — simpler than RLHF", "Constitutional AI and self-correction"],
            },
            resources: [
              { name: { zh: "Hugging Face TRL 库文档", en: "Hugging Face TRL library documentation" }, url: "https://huggingface.co/docs/trl/" },
              { name: { zh: "Hugging Face PEFT 库文档", en: "Hugging Face PEFT library documentation" }, url: "https://huggingface.co/docs/peft/" },
              { name: { zh: "Unsloth（高效微调库）", en: "Unsloth (efficient fine-tuning library)" }, url: "https://github.com/unslothai/unsloth" },
              { name: { zh: "Axolotl 微调框架", en: "Axolotl fine-tuning framework" }, url: "https://github.com/axolotl-ai-cloud/axolotl" },
            ],
            zhResources: [
              { name: "书生·浦语大模型实战营（含微调·B站）", url: "https://www.bilibili.com/video/BV18142187g5/" },
              { name: "LLaMA-Factory 大模型微调框架", url: "https://llamafactory.readthedocs.io/" },
              { name: "大模型微调（LoRA/QLoRA/全参数）详解（知乎）", url: "https://zhuanlan.zhihu.com/p/644122818" },
            ],
          },
          {
            id: "mlops",
            title: { zh: "MLOps 与模型部署", en: "MLOps & Model Deployment" },
            difficulty: { zh: "中级-高级", en: "Intermediate-Advanced" },
            duration: { zh: "3-5 个月", en: "3-5 months" },
            concepts: {
              zh: ["模型服务：REST API、gRPC、批量推理", "容器化：Docker、Kubernetes", "ML 流水线 CI/CD", "实验追踪：MLflow、Weights & Biases", "数据版本管理：DVC", "监控：数据漂移、概念漂移、性能退化", "云 ML 平台：AWS SageMaker、GCP Vertex AI、Azure ML", "LLMOps：提示管理、输出评估、成本优化"],
              en: ["Model serving: REST APIs, gRPC, batch inference", "Containerization: Docker, Kubernetes", "CI/CD for ML pipelines", "Experiment tracking: MLflow, Weights & Biases", "Data versioning: DVC", "Monitoring: data drift, concept drift, performance degradation", "Cloud ML platforms: AWS SageMaker, GCP Vertex AI, Azure ML", "LLMOps: prompt management, output evaluation, cost optimization"],
            },
            resources: [
              { name: { zh: "《设计机器学习系统》Chip Huyen", en: "Designing Machine Learning Systems by Chip Huyen" }, url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/" },
              { name: { zh: "Made With ML（MLOps 课程）", en: "Made With ML (MLOps course)" }, url: "https://madewithml.com/" },
              { name: { zh: "Full Stack Deep Learning 课程", en: "Full Stack Deep Learning course" }, url: "https://fullstackdeeplearning.com/" },
            ],
            zhResources: [
              { name: "谷歌 MLOps 实践者指南（中文翻译·知乎）", url: "https://zhuanlan.zhihu.com/p/564428496" },
              { name: "MLOps 最全资料合集（知乎）", url: "https://zhuanlan.zhihu.com/p/548932303" },
            ],
          },
          {
            id: "domain",
            title: { zh: "领域应用", en: "Domain Applications" },
            difficulty: { zh: "高级", en: "Advanced" },
            duration: { zh: "3-12 个月", en: "3-12 months" },
            concepts: {
              zh: ["医疗 AI：医学影像、药物发现、临床 NLP、FDA 合规", "金融 AI：算法交易、欺诈检测、信用评分、金融 NLP", "机器人 AI：感知、运动规划、Sim2Real、具身智能", "自动驾驶：3D 目标检测、行为预测、端到端驾驶模型"],
              en: ["Healthcare AI: medical imaging, drug discovery, clinical NLP, FDA compliance", "Finance AI: algorithmic trading, fraud detection, credit scoring, financial NLP", "Robotics AI: perception, motion planning, sim-to-real, embodied intelligence", "Autonomous vehicles: 3D object detection, behavior prediction, end-to-end driving"],
            },
            resources: [
              { name: { zh: "Stanford AIMI（医疗 AI）", en: "Stanford AIMI (Healthcare AI)" }, url: "https://aimi.stanford.edu/" },
              { name: { zh: "《金融机器学习进展》Marcos Lopez de Prado", en: "Advances in Financial ML by Marcos Lopez de Prado" }, url: "https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086" },
            ],
          },
        ],
      },
    ],
  },

  /* ── Phase 6: Frontier ── */
  {
    id: "frontier",
    title: { zh: "探索前沿方向", en: "Push the Frontier" },
    emoji: "🌌",
    phase: { zh: "前沿 · 持续探索", en: "Frontier · Ongoing" },
    description: {
      zh: "这些是 AI 最活跃的研究和应用前沿。不需要全学 —— 根据兴趣和职业方向选择性深入。",
      en: "These are the most active frontiers of AI research and application. No need to learn everything — dive into what matches your interests and career.",
    },
    subgroups: [
      {
        label: { zh: "生成与创造", en: "Generation & Creation" },
        topics: [
          {
            id: "generative",
            title: { zh: "生成式 AI", en: "Generative AI" },
            difficulty: { zh: "高级", en: "Advanced" },
            prereqs: { zh: "深度学习、概率与统计", en: "Deep Learning, Probability" },
            duration: { zh: "2-4 个月", en: "2-4 months" },
            concepts: {
              zh: ["变分自编码器（VAE）：ELBO、重参数化技巧、VQ-VAE", "生成对抗网络（GAN）：模式崩塌、StyleGAN", "扩散模型：DDPM、分数匹配、潜空间扩散", "无分类器引导（Classifier-free guidance）", "ControlNet 与条件生成", "一致性模型与蒸馏加速", "视频与 3D 扩散模型（Sora 类架构）", "流匹配（Flow Matching）"],
              en: ["VAEs: ELBO, reparameterization trick, VQ-VAE", "GANs: mode collapse, StyleGAN", "Diffusion models: DDPM, score matching, latent diffusion", "Classifier-free guidance", "ControlNet and conditional generation", "Consistency models and distillation", "Video and 3D diffusion (Sora-type)", "Flow matching"],
            },
            resources: [
              { name: { zh: "Hugging Face 扩散模型课程（免费）", en: "Hugging Face Diffusion Models Course (free)" }, url: "https://huggingface.co/learn/diffusion-course" },
              { name: { zh: "Lilian Weng 博客", en: "Lilian Weng's blog on diffusion models and VAEs" }, url: "https://lilianweng.github.io/" },
              { name: { zh: "Stanford CS236: 深度生成模型", en: "Stanford CS236: Deep Generative Models" }, url: "https://deepgenerativemodels.github.io/" },
            ],
            zhResources: [
              { name: "李宏毅 2024 春《生成式人工智能导论》（B站）", url: "https://www.bilibili.com/video/BV1BJ4m1e7g8/" },
            ],
          },
          {
            id: "multimodal",
            title: { zh: "多模态 AI", en: "Multi-modal AI" },
            difficulty: { zh: "高级", en: "Advanced" },
            prereqs: { zh: "NLP/LLM、计算机视觉", en: "NLP/LLMs, Computer Vision" },
            duration: { zh: "2-4 个月", en: "2-4 months" },
            concepts: {
              zh: ["视觉-语言模型：CLIP、LLaVA、GPT-4V/4o、Gemini", "文本生成图像：Stable Diffusion、DALL-E", "文本生成视频：Sora 类架构", "多模态融合：早期融合、晚期融合、交叉注意力", "共享表示空间与多模态嵌入", "全模态模型：单一架构处理文本、图像、音频、视频、3D"],
              en: ["Vision-language models: CLIP, LLaVA, GPT-4V/4o, Gemini", "Text-to-image: Stable Diffusion, DALL-E", "Text-to-video: Sora-type architectures", "Multi-modal fusion: early, late, cross-attention", "Shared representation spaces and embeddings", "Omni-models: single architecture for text, image, audio, video, 3D"],
            },
            resources: [
              { name: { zh: "Hugging Face 多模态模型文档", en: "Hugging Face multi-modal model docs" }, url: "https://huggingface.co/docs/transformers/main/en/tasks/image_text_to_text" },
              { name: { zh: "Stanford CS25: Transformers United", en: "Stanford CS25: Transformers United" }, url: "https://web.stanford.edu/class/cs25/" },
            ],
          },
        ],
      },
      {
        label: { zh: "智能与安全", en: "Intelligence & Safety" },
        topics: [
          {
            id: "agents",
            title: { zh: "AI 智能体", en: "AI Agents" },
            difficulty: { zh: "高级", en: "Advanced" },
            prereqs: { zh: "NLP/LLM", en: "NLP/LLMs" },
            duration: { zh: "2-4 个月", en: "2-4 months" },
            concepts: {
              zh: ["智能体架构：规划、工具使用、记忆、反思", "ReAct（推理+行动）框架", "工具增强 LLM：函数调用、代码执行", "多智能体系统：协调、通信、群体架构", "记忆系统：短期（上下文窗口）、长期（向量库、知识图谱）", "规划：思维链、思维树、思维图", "协议：Anthropic MCP、Google A2A", "智能体安全：沙箱、护栏、人类在环"],
              en: ["Agentic architectures: planning, tool use, memory, reflection", "ReAct (Reasoning + Acting) framework", "Tool-augmented LLMs: function calling, code execution", "Multi-agent systems: coordination, communication, swarm", "Memory: short-term (context), long-term (vector DB, knowledge graphs)", "Planning: chain/tree/graph-of-thought", "Protocols: Anthropic MCP, Google A2A", "Agent safety: sandboxing, guardrails, human-in-the-loop"],
            },
            resources: [
              { name: { zh: "Lilian Weng:「LLM 驱动的自主智能体」", en: "Lilian Weng: 'LLM Powered Autonomous Agents'" }, url: "https://lilianweng.github.io/posts/2023-06-23-agent/" },
              { name: { zh: "LangChain / LangGraph 文档", en: "LangChain / LangGraph documentation" }, url: "https://python.langchain.com/docs/introduction/" },
            ],
          },
          {
            id: "gnn",
            title: { zh: "图神经网络", en: "Graph Neural Networks" },
            difficulty: { zh: "高级", en: "Advanced" },
            prereqs: { zh: "深度学习、线性代数", en: "Deep Learning, Linear Algebra" },
            duration: { zh: "2-3 个月", en: "2-3 months" },
            concepts: {
              zh: ["图表示：邻接矩阵、节点/边特征", "消息传递框架", "GCN、GraphSAGE、GAT", "图 Transformer", "过平滑与过压缩问题", "应用：分子预测、社交网络、推荐系统、知识图谱"],
              en: ["Graph representations: adjacency matrix, node/edge features", "Message passing framework", "GCN, GraphSAGE, GAT", "Graph Transformers", "Over-smoothing and over-squashing", "Applications: molecular prediction, social networks, recommendation, knowledge graphs"],
            },
            resources: [
              { name: { zh: "Stanford CS224W: 图机器学习", en: "Stanford CS224W: ML with Graphs" }, url: "https://web.stanford.edu/class/cs224w/" },
              { name: { zh: "《图表示学习》Hamilton（免费 PDF）", en: "Graph Representation Learning by Hamilton (free PDF)" }, url: "https://www.cs.mcgill.ca/~wlh/grl_book/" },
              { name: { zh: "PyTorch Geometric 教程", en: "PyTorch Geometric tutorials" }, url: "https://pytorch-geometric.readthedocs.io/en/latest/get_started/colabs.html" },
            ],
            zhResources: [
              { name: "CS224W 图机器学习（ShowMeAI 中文资源）", url: "https://www.showmeai.tech/article-detail/352" },
            ],
          },
          {
            id: "safety",
            title: { zh: "AI 安全与对齐", en: "AI Safety & Alignment" },
            difficulty: { zh: "中级-高级", en: "Intermediate-Advanced" },
            prereqs: { zh: "NLP/LLM", en: "NLP/LLMs" },
            duration: { zh: "持续", en: "Ongoing" },
            why: { zh: "随着 AI 能力增强，确保 AI 系统安全可控变得越来越重要。这不只是技术问题，也是社会问题。", en: "As AI capabilities grow, ensuring AI systems are safe and controllable becomes increasingly critical. It's not just technical — it's societal." },
            concepts: {
              zh: ["对齐问题：确保 AI 追求预期目标", "奖励黑客与规范博弈", "可扩展监督与 RLHF 局限性", "Constitutional AI 与自我纠正", "机制可解释性", "红队测试与对抗鲁棒性", "欺骗性对齐与元优化", "AI 治理与政策"],
              en: ["The alignment problem", "Reward hacking and specification gaming", "Scalable oversight and RLHF limitations", "Constitutional AI and self-correction", "Mechanistic interpretability", "Red teaming and adversarial robustness", "Deceptive alignment and mesa-optimization", "AI governance and policy"],
            },
            resources: [
              { name: { zh: "80,000 Hours AI 安全阅读清单", en: "80,000 Hours AI Safety Reading List" }, url: "https://80000hours.org/articles/ai-safety-syllabus/" },
              { name: { zh: "AI Safety Fundamentals（BlueDot Impact）", en: "AI Safety Fundamentals (BlueDot Impact)" }, url: "https://aisafetyfundamentals.com/" },
              { name: { zh: "Alignment Forum", en: "Alignment Forum" }, url: "https://www.alignmentforum.org/" },
              { name: { zh: "Robert Miles YouTube 频道", en: "Robert Miles YouTube channel" }, url: "https://www.youtube.com/@RobertMilesAI" },
            ],
            zhResources: [
              { name: "安远AI「AI安全与对齐」学者计划课程", url: "https://course.anyuan-ai.com/alignment" },
              { name: "北大《人工智能对齐：全面性综述》中文版", url: "https://alignmentsurvey.com/uploads/AI-Alignment-A-Comprehensive-Survey-CN.pdf" },
            ],
          },
        ],
      },
    ],
  },
  // NEW SECTION: TRENDING TOPICS
  {
    id: "trending",
    title: { zh: "热门趋势", en: "Trending Topics" },
    emoji: "🔥",
    phase: { zh: "前沿 · 持续更新", en: "Trending · Ongoing Updates" },
    description: {
      zh: "AI 领域日新月异。这里汇集了最新的热门话题、工具和应用，帮助你快速跟上时代步伐。",
      en: "The AI field evolves rapidly. This section covers the latest trending topics, tools, and applications to help you stay up-to-date.",
    },
    subgroups: [
      {
        label: { zh: "AI 智能体", en: "AI Agents" },
        topics: [
          {
            id: "agent-revolution",
            title: { zh: "AI 智能体革命", en: "Agent Revolution" },
            difficulty: { zh: "中级", en: "Intermediate" },
            duration: { zh: "2-3 个月", en: "2-3 months" },
            why: {
              zh: "AI 智能体正在改变我们与计算机交互的方式，从简单的问答到自主执行复杂任务。",
              en: "AI agents are transforming how we interact with computers, from simple Q&A to autonomous execution of complex tasks.",
            },
            concepts: {
              zh: ["智能体架构：感知、思考、行动循环", "工具使用：函数调用、API 集成", "记忆系统：短期上下文、长期向量数据库", "多智能体协作：团队合作与分工", "规划与推理：从思维链到思维树", "协议：MCP、A2A、Model Context Protocol"],
              en: ["Agent architecture: perception, reasoning, action loop", "Tool use: function calling, API integration", "Memory systems: short-term context, long-term vector DB", "Multi-agent collaboration: teamwork and division of labor", "Planning and reasoning: from chain-of-thought to tree-of-thought", "Protocols: MCP, A2A, Model Context Protocol"],
            },
            resources: [
              { name: { zh: "Lilian Weng: LLM 驱动的自主智能体", en: "Lilian Weng: LLM Powered Autonomous Agents" }, url: "https://lilianweng.github.io/posts/2023-06-23-agent/" },
              { name: { zh: "LangChain 文档", en: "LangChain Documentation" }, url: "https://python.langchain.com/docs/" },
              { name: { zh: "Model Context Protocol 官方文档", en: "Model Context Protocol Official Docs" }, url: "https://modelcontextprotocol.io/" },
            ],
            zhResources: [
              { name: "AI 智能体从入门到实战（B站）", url: "https://www.bilibili.com/video/BV..." }, // Placeholder for actual Chinese resource
            ],
          },
          {
            id: "agent-frameworks",
            title: { zh: "主流智能体框架", en: "Agent Frameworks" },
            difficulty: { zh: "入门", en: "Beginner" },
            duration: { zh: "1-2 个月", en: "1-2 months" },
            prereqs: { zh: "Python 基础、LLM 基础概念", en: "Python basics, LLM fundamentals" },
            concepts: {
              zh: ["LangChain / LangGraph：构建智能体的瑞士军刀", "AutoGen：微软的多智能体协作框架", "CrewAI：角色导向智能体框架", "BabyAGI：任务驱动的智能体原型", "MetaGPT：多-agent 系统模拟公司结构"],
              en: ["LangChain / LangGraph: the Swiss Army knife for building agents", "AutoGen: Microsoft's multi-agent collaboration framework", "CrewAI: role-based agent framework", "BabyAGI: task-driven agent prototype", "MetaGPT: multi-agent system simulating company structure"],
            },
            resources: [
              { name: { zh: "LangChain 官方教程", en: "LangChain Official Tutorials" }, url: "https://langchain.dev/tutorials/" },
              { name: { zh: "AutoGen 文档", en: "AutoGen Documentation" }, url: "https://microsoft.github.io/autogen/" },
              { name: { zh: "CrewAI 文档", en: "CrewAI Documentation" }, url: "https://crewai.com/" },
            ],
            zhResources: [
              { name: "国产智能体框架：ChatGLM 智能体、Baidu 飞桨智能体", url: "https://github.com..." },
            ],
          },
        ],
      },
      {
        label: { zh: "Vibe Coding", en: "Vibe Coding" },
        topics: [
          {
            id: "vibe-coding",
            title: { zh: "Vibe Coding 革命", en: "Vibe Coding Revolution" },
            difficulty: { zh: "入门", en: "Beginner" },
            duration: { zh: "1-2 个月", en: "1-2 months" },
            why: {
              zh: "Vibe Coding 是 AI 辅助编程的新范式，让开发者用自然语言描述需求，AI 自动生成代码。",
              en: "Vibe Coding is the new paradigm of AI-assisted programming that lets developers describe requirements in natural language and have AI generate code automatically.",
            },
            concepts: {
              zh: ["自然语言到代码：从描述到实现", "AI 配偶：Claude Code、Cursor、Windsurf", "即时反馈：AI 实时生成、修复代码", "代码理解：AI 阅读并解释代码", "项目管理：AI 规划开发路线", "Vibe 文化：拥抱混乱、快速迭代"],
              en: ["Natural language to code: from description to implementation", "AI pair programmers: Claude Code, Cursor, Windsurf", "Instant feedback: AI generates and fixes code in real-time", "Code comprehension: AI reads and explains code", "Project management: AI plans development roadmap", "Vibe culture: embracing chaos, rapid iteration"],
            },
            resources: [
              { name: { zh: "Claude Code 官方文档", en: "Claude Code Official Documentation" }, url: "https://code.anthropic.com/" },
              { name: { zh: "Cursor 文档", en: "Cursor Documentation" }, url: "https://cursor.sh/docs" },
              { name: { zh: "Windsurf 文档", en: "Windsurf Documentation" }, url: "https://codeium.com/windsurf" },
              { name: { zh: "Vibe Coding 入门指南", en: "Vibe Coding Primer" }, url: "https://example.com/vibe-coding" },
            ],
            zhResources: [
              { name: "国内 AI 编程助手：CodeGeeX、Step、TypeAI", url: "https://codegeex.cn/" },
            ],
          },
          {
            id: "agent-coding",
            title: { zh: "智能体编程", en: "Agent Programming" },
            difficulty: { zh: "中级", en: "Intermediate" },
            duration: { zh: "2-3 个月", en: "2-3 months" },
            prereqs: { zh: "Python 编程、基础 AI 概念", en: "Python programming, basic AI concepts" },
            concepts: {
              zh: ["AI 作为团队成员：智能体接管开发任务", "自动规划：从需求到实现路径", "代码生成：AI 编写完整功能模块", "测试与调试：AI 自动测试和修复", "部署与运维：AI 管理生产环境", "协作模式：人类 + AI 团队协作"],
              en: ["AI as team member: agents taking over development tasks", "Automated planning: from requirements to implementation path", "Code generation: AI writes complete feature modules", "Testing and debugging: AI automated testing and fixing", "Deployment and operations: AI manages production environment", "Collaboration patterns: human + AI team collaboration"],
            },
            resources: [
              { name: { zh: "SWE-Agent 论文", en: "SWE-Agent Paper" }, url: "https://arxiv.org/abs/..." },
              { name: { zh: "OpenDevin 文档", en: "OpenDevin Documentation" }, url: "https://opendevin.com/" },
              { name: { zh: "Devin 演示视频", en: "Devin Demo Video" }, url: "https://www.youtube.com/watch?v=..." },
            ],
            zhResources: [
              { name: "国内 AI 软件工程师：MaaS、AI 开发助手", url: "https://..." },
            ],
          },
        ],
      },
      {
        label: { zh: "应用与案例", en: "Applications & Cases" },
        topics: [
          {
            id: "agent-apps",
            title: { zh: "智能体应用案例", en: "Agent Applications" },
            difficulty: { zh: "入门", en: "Beginner" },
            duration: { zh: "1-2 个月", en: "1-2 months" },
            why: {
              zh: "从自动化测试到内容生成，AI 智能体正在各个领域创造价值。",
              en: "From automated testing to content generation, AI agents are creating value across domains.",
            },
            concepts: {
              zh: ["自动化测试：智能测试智能体", "内容生成：文章、代码、设计自动化", "数据分析：自动洞察与报告", "客户服务：智能客服与支持", "个人助理：日程管理、邮件处理", "研究助手：文献调研、实验设计"],
              en: ["Automated testing: intelligent test agents", "Content generation: automated articles, code, design", "Data analysis: automatic insights and reporting", "Customer service: intelligent support agents", "Personal assistant: schedule management, email handling", "Research assistant: literature review, experiment design"],
            },
            resources: [
              { name: { zh: "AI Agent Use Cases 集合", en: "AI Agent Use Cases Collection" }, url: "https://github.com/agents/awesome-agents" },
              { name: { zh: "AutoGPT 应用案例", en: "AutoGPT Use Cases" }, url: "https://github.com/Significant-Gravitas/Auto-GPT" },
              { name: { zh: "BabyAGI 应用案例", en: "BabyAGI Use Cases" }, url: "https://github.com/yoheinakajima/babyagi" },
            ],
            zhResources: [
              { name: "国内 AI 智能体应用：智能客服、智能写作、智能助理", url: "https://..." },
            ],
          },
          {
            id: "vibe-demos",
            title: { zh: "Vibe Coding 演示", en: "Vibe Coding Demos" },
            difficulty: { zh: "入门", en: "Beginner" },
            duration: { zh: "1-2 周", en: "1-2 weeks" },
            concepts: {
              zh: ["从零构建 Web 应用：AI 写前端后端", "游戏开发：AI 生成游戏逻辑和资源", "数据分析：AI 处理和可视化数据", "自动化脚本：AI 写运维脚本", "移动应用：AI 生成 iOS/Android 应用"],
              en: ["Build web apps from scratch: AI writes frontend and backend", "Game development: AI generates game logic and assets", "Data analysis: AI processes and visualizes data", "Automation scripts: AI writes DevOps scripts", "Mobile apps: AI generates iOS/Android apps"],
            },
            resources: [
              { name: { zh: "Vibe Coding 视频教程", en: "Vibe Coding Video Tutorials" }, url: "https://www.youtube.com/results?search_query=vibe+coding" },
              { name: { zh: "Claude Code 演示", en: "Claude Code Demos" }, url: "https://www.youtube.com/watch?v=..." },
              { name: { zh: "Cursor 演示", en: "Cursor Demos" }, url: "https://www.youtube.com/watch?v=..." },
            ],
            zhResources: [
              { name: "国内 AI 编程演示：CodeGeeX、Step、TypeAI", url: "https://www.bilibili.com/video/BV..." },
            ],
          },
        ],
      },
    ],
  },
  // END NEW SECTION
];

/* ════════════════════════════════════════
   CROSS-CUTTING RESOURCES
   ════════════════════════════════════════ */

/* ════════════════════════════════════════
   LEARN BY STYLE — tutorials grouped by
   teaching style: live-coding vs. explainers
   ════════════════════════════════════════ */

export interface StyledResource {
  name: string;
  type: { zh: string; en: string };
  desc: { zh: string; en: string };
  url: string;
}

export interface StyleGroup {
  id: string;
  emoji: string;
  label: { zh: string; en: string };
  blurb: { zh: string; en: string };
  items: StyledResource[];
}

export const learningByStyle: {
  title: { zh: string; en: string };
  subtitle: { zh: string; en: string };
  groups: StyleGroup[];
} = {
  title: { zh: "按学习风格挑课", en: "Learn by Style" },
  subtitle: {
    zh: "喜欢跟着敲的实战派，和喜欢先想明白再动手的直觉派 —— 各取所需。",
    en: "Whether you learn by coding along live or by getting the intuition first, pick what fits your brain.",
  },
  groups: [
    {
      id: "live-coding",
      emoji: "⚡",
      label: { zh: "跟着敲 · 实战直播 & 动手构建 AI 应用", en: "Code Along · Live Builds & Hands-On AI Apps" },
      blurb: {
        zh: "项目驱动的教程 —— 打开编辑器，和讲师一起一行一行把 AI 应用写出来。",
        en: "Project-driven tutorials — open an editor and ship a real AI app alongside the instructor, line by line.",
      },
      items: [
        {
          name: "Nicholas Renotte",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "端到端 ML/AI 应用直播构建（TF、Streamlit、MERN）", en: "End-to-end ML/AI app live builds (TF, Streamlit, MERN)" },
          url: "https://www.youtube.com/c/NicholasRenotte",
        },
        {
          name: "sentdex",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "Python ML/DL 实战教程的长青频道", en: "Long-running Python ML/DL hands-on tutorials" },
          url: "https://www.youtube.com/@sentdex",
        },
        {
          name: "James Briggs",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "LangChain、RAG、向量数据库的代码级演示", en: "Code-level walkthroughs of LangChain, RAG, vector DBs" },
          url: "https://www.youtube.com/@jamesbriggs",
        },
        {
          name: "AI Jason",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "AI 智能体与 LangGraph 项目从零构建", en: "AI agents and LangGraph projects built from zero" },
          url: "https://www.youtube.com/@AIJasonZ",
        },
        {
          name: "Umar Jamil",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "从零 PyTorch 复刻 Transformer / LLaMA / SD（长视频深讲）", en: "From-scratch PyTorch reimplementations of Transformer / LLaMA / SD" },
          url: "https://www.youtube.com/@umarjamilai",
        },
        {
          name: "LangChain (Official)",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "框架作者亲自示范 LangChain / LangGraph 用法", en: "Framework creators demoing LangChain / LangGraph step by step" },
          url: "https://www.youtube.com/@LangChain",
        },
        {
          name: "Mastering LLMs (Hamel Husain)",
          type: { zh: "免费课程", en: "Free Course" },
          desc: { zh: "实战派讲师的 LLM 评估、RAG、微调工作坊合集", en: "Practitioner workshops on LLM evals, RAG, fine-tuning" },
          url: "https://hamel.dev/blog/posts/course/",
        },
        {
          name: "Full Stack Deep Learning",
          type: { zh: "课程", en: "Course" },
          desc: { zh: "LLM Bootcamp：从原型到生产的全流程实战", en: "LLM Bootcamp: prototype → production, the full lifecycle" },
          url: "https://fullstackdeeplearning.com/",
        },
        {
          name: "DeepLearning.AI Short Courses",
          type: { zh: "短课程", en: "Short Courses" },
          desc: { zh: "1 小时动手短课（LangChain、RAG、Agents 等）", en: "~1-hour hands-on courses (LangChain, RAG, Agents, more)" },
          url: "https://www.deeplearning.ai/short-courses/",
        },
      ],
    },
    {
      id: "intuitive-explainers",
      emoji: "💡",
      label: { zh: "直觉派 · 趣味讲解与可视化", en: "Intuition First · Fun Explainers & Visuals" },
      blurb: {
        zh: "先想明白再动手 —— 这些创作者擅长把复杂概念讲成人话，配图生动。",
        en: "Understand before you code — creators who turn dense ideas into clear mental pictures.",
      },
      items: [
        {
          name: "StatQuest with Josh Starmer",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "“BAM!”风格把统计与 ML 讲到极致友好", en: "Friendly “BAM!” breakdowns of stats & ML concepts" },
          url: "https://www.youtube.com/@statquest",
        },
        {
          name: "Jay Alammar — Illustrated Blog",
          type: { zh: "博客", en: "Blog" },
          desc: { zh: "《图解 Transformer》系列的开创者", en: "Home of The Illustrated Transformer / GPT-2 / Word2vec" },
          url: "https://jalammar.github.io/",
        },
        {
          name: "Yannic Kilcher",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "热门论文逐页解读与吐槽", en: "Page-by-page paper walkthroughs with sharp commentary" },
          url: "https://www.youtube.com/@YannicKilcher",
        },
        {
          name: "AI Coffee Break with Letitia",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "咖啡杯长度的前沿 AI 概念短讲", en: "Bite-sized, coffee-break-length cutting-edge explainers" },
          url: "https://www.youtube.com/@AICoffeeBreak",
        },
        {
          name: "Sebastian Raschka — Ahead of AI",
          type: { zh: "博客/通讯", en: "Blog/Newsletter" },
          desc: { zh: "LLM 论文与技术的清晰深度总结", en: "Clear, deep write-ups of LLM papers and techniques" },
          url: "https://magazine.sebastianraschka.com/",
        },
        {
          name: "Machine Learning Street Talk",
          type: { zh: "播客", en: "Podcast" },
          desc: { zh: "与顶尖研究者的长篇深度对话", en: "Long-form, deep interviews with top researchers" },
          url: "https://www.youtube.com/@MachineLearningStreetTalk",
        },
        {
          name: "Two Minute Papers",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "“Dear Fellow Scholars!” —— 新论文的激动人心速览", en: "“Dear Fellow Scholars!” — excited tours of fresh papers" },
          url: "https://www.youtube.com/@TwoMinutePapers",
        },
        {
          name: "Computerphile",
          type: { zh: "YouTube", en: "YouTube" },
          desc: { zh: "由实际研究者讲解 CS 与 AI 的经典频道", en: "Classic channel with researchers explaining CS & AI topics" },
          url: "https://www.youtube.com/@Computerphile",
        },
      ],
    },
    {
      id: "chinese-taiwan",
      emoji: "🀄",
      label: { zh: "华语与台湾创作者 · 中文友好的优质课程", en: "Chinese & Taiwan Creators · Top-Tier Mandarin Learning" },
      blurb: {
        zh: "来自两岸的顶级老师与社区 —— 中文原生讲解，既有手把手直播敲代码，也有把论文讲成故事的高手。",
        en: "The best Mandarin-language instructors and communities across the strait — hands-on live coding and story-style paper walkthroughs, all natively in Chinese.",
      },
      items: [
        {
          name: "李宏毅 Hung-yi Lee — 台大",
          type: { zh: "YouTube / 课程", en: "YouTube / Course" },
          desc: {
            zh: "華語界最出名的 ML/DL 課程，講解生動、作業扎實",
            en: "Most famous Mandarin ML/DL course — lively explanations, solid labs",
          },
          url: "https://www.youtube.com/@HungyiLeeNTU",
        },
        {
          name: "生成式AI時代下的機器學習 2025",
          type: { zh: "台大课程", en: "NTU Course" },
          desc: {
            zh: "李宏毅老師 2025 春季課程主頁（投影片＋作業）",
            en: "Hung-yi Lee's 2025 spring course page (slides + assignments)",
          },
          url: "https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php",
        },
        {
          name: "林軒田 — 機器學習基石",
          type: { zh: "Coursera", en: "Coursera" },
          desc: {
            zh: "台大經典 ML 入門課，理論扎實、講解清晰",
            en: "NTU's classic ML foundations course — rigorous and crystal clear",
          },
          url: "https://www.coursera.org/learn/ntumlone-mathematicalfoundations",
        },
        {
          name: "林軒田 — 機器學習技法",
          type: { zh: "Coursera", en: "Coursera" },
          desc: {
            zh: "《基石》的進階續集，講 SVM / 核方法 / 集成學習",
            en: "Sequel to Foundations — SVM, kernel methods, ensemble learning",
          },
          url: "https://www.coursera.org/learn/machine-learning-techniques",
        },
        {
          name: "陳縕儂 Vivian · NTU MiuLab",
          type: { zh: "YouTube", en: "YouTube" },
          desc: {
            zh: "台大《應用深度學習 ADL》完整課程，含 RAG、後訓練等新內容",
            en: "NTU's Applied Deep Learning course — includes RAG, post-training, more",
          },
          url: "https://www.youtube.com/c/VivianNTUMiuLab",
        },
        {
          name: "跟李沐学AI",
          type: { zh: "B站", en: "Bilibili" },
          desc: {
            zh: "《动手学深度学习》作者李沐的直播课 —— 边讲边写 PyTorch",
            en: "Mu Li (D2L author) live-streams — explaining and coding PyTorch together",
          },
          url: "https://space.bilibili.com/1567748478/",
        },
        {
          name: "动手学深度学习 D2L",
          type: { zh: "开源书 / 课程", en: "Open Book / Course" },
          desc: {
            zh: "配套教材＋PyTorch/MXNet/PaddlePaddle 代码，被 200+ 高校采用",
            en: "The companion textbook with full runnable code, used at 200+ universities",
          },
          url: "https://zh-v2.d2l.ai/",
        },
        {
          name: "同济子豪兄",
          type: { zh: "B站", en: "Bilibili" },
          desc: {
            zh: "同济大学硕士，CV/NLP/图神经网络的高质量精讲 UP 主",
            en: "Tongji University MS — high-quality CV/NLP/GNN explainer videos",
          },
          url: "https://space.bilibili.com/1900783/",
        },
        {
          name: "王木头学科学",
          type: { zh: "B站", en: "Bilibili" },
          desc: {
            zh: "把神经网络、Transformer 讲成数学直觉故事的宝藏 UP 主",
            en: "Turns neural nets and Transformers into intuitive mathematical stories",
          },
          url: "https://space.bilibili.com/504715181/",
        },
        {
          name: "邱锡鹏《神经网络与深度学习》",
          type: { zh: "开源书", en: "Open Book" },
          desc: {
            zh: "复旦邱锡鹏教授的中文经典「蒲公英书」，免费 PDF + PPT",
            en: "Fudan Prof. Qiu's classic Chinese \"Dandelion Book\" — free PDF + slides",
          },
          url: "https://nndl.github.io/",
        },
        {
          name: "Datawhale",
          type: { zh: "学习社区", en: "Community" },
          desc: {
            zh: "国内最大开源 AI 学习社区，免费 LLM / Agent / RAG 实战教程",
            en: "China's largest open AI learning community — free LLM/Agent/RAG tutorials",
          },
          url: "https://www.datawhale.cn/",
        },
        {
          name: "Datawhale GitHub",
          type: { zh: "GitHub", en: "GitHub" },
          desc: {
            zh: "self-llm、llm-cookbook、llm-universe 等 20+ 开源教程仓库",
            en: "20+ open repos: self-llm, llm-cookbook, llm-universe, and more",
          },
          url: "https://github.com/datawhalechina",
        },
        {
          name: "CS自学指南 csdiy.wiki",
          type: { zh: "指南", en: "Guide" },
          desc: {
            zh: "中文 CS/AI 自学资源导航，含李宏毅、MIT、Stanford 等课程指南",
            en: "Chinese-language CS/AI self-study guide — curated walkthroughs of top courses",
          },
          url: "https://csdiy.wiki/",
        },
      ],
    },
  ],
};

export const crossResources = {
  title: { zh: "百宝箱", en: "Toolbox" },
  subtitle: { zh: "无论你在哪个阶段，这些资源都值得收藏。", en: "No matter which phase you're in, these resources are worth bookmarking." },
  items: [
    { name: "fast.ai", type: { zh: "课程", en: "Course" }, desc: { zh: "实践导向的自顶向下深度学习", en: "Practical top-down deep learning" }, url: "https://course.fast.ai/" },
    { name: "DeepLearning.AI", type: { zh: "课程", en: "Course" }, desc: { zh: "结构化专项课程", en: "Structured specializations" }, url: "https://www.deeplearning.ai/courses/" },
    { name: "Andrej Karpathy", type: { zh: "视频", en: "Video" }, desc: { zh: "构建直觉、从零编码", en: "Building intuition, coding from scratch" }, url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ" },
    { name: "Hugging Face", type: { zh: "平台", en: "Platform" }, desc: { zh: "模型、数据集、教程、社区", en: "Models, datasets, tutorials, community" }, url: "https://huggingface.co/" },
    { name: "Papers With Code", type: { zh: "参考", en: "Reference" }, desc: { zh: "最新技术追踪", en: "SOTA tracking, paper-code links" }, url: "https://paperswithcode.com/" },
    { name: "Lilian Weng Blog", type: { zh: "博客", en: "Blog" }, desc: { zh: "出色的技术总结", en: "Exceptional technical summaries" }, url: "https://lilianweng.github.io/" },
    { name: "3Blue1Brown", type: { zh: "视频", en: "Video" }, desc: { zh: "数学直觉培养", en: "Math intuition building" }, url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
    { name: "Kaggle", type: { zh: "平台", en: "Platform" }, desc: { zh: "竞赛、数据集、Notebook", en: "Competitions, datasets, notebooks" }, url: "https://www.kaggle.com/" },
    { name: "arXiv", type: { zh: "论文", en: "Papers" }, desc: { zh: "一手研究论文", en: "Primary research papers" }, url: "https://arxiv.org/" },
  ],
};
