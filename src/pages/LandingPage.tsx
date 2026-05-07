import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  LayoutDashboard, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Share2,
  Database,
  Blocks,
  Cpu,
  Clock,
  Calendar,
  BarChart3,
  Bell,
  Activity,
  Layers
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -600]);
  const rotate1 = useTransform(scrollY, [0, 2000], [12, 45]);
  const opacity = useTransform(scrollY, [0, 1000], [1, 0.1]);

  const stats = [
    { label: '核心业务表支撑', val: '19张', icon: Database },
    { label: '全流程自动化任务', val: '10+', icon: Zap },
    { label: '飞书集成深度', val: '5大维度', icon: Blocks },
    { label: '标准化覆盖率', val: '100%', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      {/* Apple-style Sophisticated Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[80%] h-[80%] bg-gradient-to-br from-orange-50/40 via-white to-transparent rounded-full blur-[160px] opacity-50" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[70%] h-[70%] bg-gradient-to-tl from-blue-50/30 via-white to-transparent rounded-full blur-[140px] opacity-40" />
        
        {/* Dynamic Light Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] right-[20%] w-96 h-96 bg-blue-100/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-[15%] w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[150px]" 
        />
      </div>

      {/* Floating Parallax Elements (Visual Hierarchy) - Refined for Visibility */}
      <motion.div style={{ y: y1, opacity }} className="fixed inset-0 z-1 pointer-events-none hidden lg:block overflow-hidden">
        <motion.div style={{ rotate: rotate1 }} className="absolute top-[10%] left-[2%]">
          <Clock className="w-48 h-48 text-slate-100/80" />
        </motion.div>
        <Calendar className="absolute top-[35%] right-[5%] w-64 h-64 text-slate-100/60 -rotate-12" />
        <BarChart3 className="absolute bottom-[15%] left-[5%] w-72 h-72 text-slate-100/40 rotate-6" />
        <Activity className="absolute top-[55%] left-[2%] w-40 h-40 text-slate-100/30 -rotate-12" />
        <Bell className="absolute top-[5%] right-[25%] w-32 h-32 text-orange-500/[0.04] rotate-12" />
        <Database className="absolute bottom-[30%] right-[15%] w-56 h-56 text-slate-100/20 rotate-[-8deg]" />
      </motion.div>

      <motion.div style={{ y: y2, opacity }} className="fixed inset-0 z-1 pointer-events-none hidden lg:block overflow-hidden">
        <Layers className="absolute top-[20%] right-[20%] w-40 h-40 text-slate-100/40 rotate-45" />
        <Zap className="absolute top-[2%] right-[40%] w-28 h-28 text-orange-500/[0.05] rotate-12" />
        <MessageSquare className="absolute bottom-[2%] right-[5%] w-80 h-80 text-blue-500/[0.03] -rotate-6" />
        <LayoutDashboard className="absolute bottom-[35%] left-[25%] w-48 h-48 text-slate-100/30 rotate-12" />
        <Share2 className="absolute top-[65%] right-[35%] w-32 h-32 text-slate-100/20" />
        <ShieldCheck className="absolute top-[45%] left-[35%] w-56 h-56 text-slate-100/10 -rotate-12" />
        <Users className="absolute bottom-[10%] left-[40%] w-64 h-64 text-slate-100/10 rotate-12" />
      </motion.div>

      {/* Glassmorphism Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-100/40"
      >
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-950 rounded-[12px] flex items-center justify-center overflow-hidden shadow-2xl shadow-slate-300">
              <img src="/logo.png" alt="Lumist Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black tracking-tighter text-2xl text-slate-950 leading-none">Lumist Project Hub</span>
          </div>
          <button 
            onClick={onEnter}
            className="px-8 py-2.5 bg-slate-950 text-white rounded-full text-[13px] font-black hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            立即登录
          </button>
        </div>
      </motion.nav>

      {/* Hero Section - Apple Aesthetics Refined */}
      <section className="relative z-10 pt-32 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-[120px] font-black tracking-[-0.05em] leading-[1.05] mb-14 text-transparent bg-clip-text bg-gradient-to-b from-slate-950 via-slate-900 to-blue-800">
              项目智能<br />推进系统
            </h1>
            
            <p className="text-xl md:text-[26px] text-slate-400 max-w-4xl mx-auto font-medium leading-[1.6] mb-20 tracking-tight">
              针对路觅教育跨部门协同痛点，<span className="text-slate-900 font-bold border-b-2 border-orange-500/20 pb-0.5 underline decoration-orange-500/40 decoration-2 underline-offset-8 transition-colors hover:decoration-orange-500">打造标准化迭代管理闭环</span>。<br />
              流程即代码，系统驱动协作。整合飞书生态，<span className="text-slate-900 font-bold border-b-2 border-blue-500/10 pb-0.5 underline decoration-blue-500/30 decoration-2 underline-offset-8 transition-colors hover:decoration-blue-500">提高项目推进效率</span>。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <button 
                onClick={onEnter}
                className="px-16 py-7 bg-slate-950 text-white rounded-[32px] font-black text-2xl hover:bg-orange-600 transition-all active:scale-95 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3)] flex items-center gap-5 group"
              >
                立刻进入平台
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-5 text-slate-400 font-bold px-6 py-3 bg-white/40 backdrop-blur-md rounded-2xl border border-slate-100/50">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-[3px] border-white bg-slate-100 shadow-sm" />
                  ))}
                </div>
                <span className="text-sm font-black tracking-tight text-slate-500 uppercase">6 大部门高效联动</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Stats Section - Floating over background icons */}
      <section className="relative z-10 py-28 border-y border-slate-50 bg-white/20 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20 md:gap-12">
            {stats.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                className="group cursor-default"
              >
                <div className="text-slate-200 mb-8 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-500">
                  <s.icon className="w-10 h-10" />
                </div>
                <div className="text-5xl font-black text-slate-950 mb-3 tracking-tighter">{s.val}</div>
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections - Apple Style "Bento Box" */}
      <section id="lifecycle" className="relative z-10 py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Top Large Bento: Lifecycle */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="md:col-span-8 bg-[#F5F5F7] rounded-[64px] p-16 md:p-24 overflow-hidden relative group min-h-[600px] border border-slate-200/50"
            >
              <div className="relative z-10 max-w-xl">
                <h2 className="text-6xl font-black text-slate-950 leading-[1.05] mb-10 tracking-tighter">
                  全流程标准化<br />管理驱动引擎
                </h2>
                <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-16 tracking-tight">
                  覆盖 P1 立项至 P5 跟踪的全链路闭环。<br />
                  <span className="text-slate-950">将迭代规章固化为系统动作，</span> 让协作如代码般精准运行。
                </p>
                
                {/* Visual Roadmap Refined */}
                <div className="flex items-center gap-6 w-full max-w-md">
                  {['P1', 'P2', 'P3', 'P4', 'P5', 'Review'].map((step, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-4">
                      <div className={cn(
                        "h-3 rounded-full transition-all duration-1000",
                        i < 4 ? "bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" : "bg-slate-200"
                      )} />
                      <span className="text-[11px] font-black text-slate-400 text-center uppercase tracking-tighter">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Graphic Element Refined */}
              <div className="absolute right-[-5%] bottom-[-5%] w-[60%] h-[80%] bg-white/90 backdrop-blur-2xl rounded-[80px] border border-white p-12 rotate-[-12deg] hidden lg:block shadow-2xl opacity-50 group-hover:opacity-100 group-hover:rotate-[-8deg] transition-all duration-1000">
                <div className="space-y-10">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="h-5 bg-slate-50 rounded-full w-full flex items-center px-4 overflow-hidden relative">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.random() * 50 + 35}%` }}
                        transition={{ duration: 2, delay: i * 0.1 }}
                        className={cn("h-full absolute left-0 top-0", i % 3 === 0 ? "bg-orange-500/40" : i % 3 === 1 ? "bg-blue-500/30" : "bg-slate-900/10")}
                       />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar Bento: AI Intelligence */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="md:col-span-4 bg-slate-950 rounded-[64px] p-16 text-white flex flex-col justify-between relative overflow-hidden group shadow-2xl border border-white/5"
            >
              <div className="absolute top-[-10%] right-[-10%] p-32 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-12 border border-white/10 backdrop-blur-2xl">
                  <Cpu className="w-9 h-9 text-orange-400" />
                </div>
                <h3 className="text-[42px] font-black mb-8 tracking-tight leading-[1.05] text-white/95">AI 智能决策链</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-12 text-xl tracking-tight">
                  全量同步飞书多维动态，AI 特征提取：<br />
                  <span className="text-orange-400 font-bold inline-block mt-4 border-b-2 border-orange-500/40 py-1 transition-all group-hover:border-orange-500">
                    通知 / 决策 / 待办 / 风险
                  </span>
                </p>
              </div>

              <div className="relative z-10 pt-12 border-t border-white/10 flex items-center justify-between group-hover:text-orange-400 transition-colors pointer-events-auto">
                 <span className="text-xs font-black uppercase tracking-[0.3em]">探索决策智能追溯</span>
                 <ChevronRight className="w-6 h-6" />
              </div>
            </motion.div>

            {/* Bottom Wide Bento: Integration */}
            <motion.div 
              id="integration"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-12 bg-white border border-slate-100 rounded-[64px] p-16 md:p-28 card-shadow flex flex-col md:flex-row items-center gap-28 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-blue-50/20 pointer-events-none" />
              <div className="relative z-10 flex-1 space-y-12">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center group-hover:rotate-[10deg] transition-all duration-700 shadow-sm border border-blue-100">
                  <Blocks className="w-10 h-10" />
                </div>
                <h3 className="text-[64px] font-black text-slate-950 tracking-tighter leading-[1.05]">
                  飞书生态<br />全栈集成矩阵
                </h3>
                <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-md tracking-tight">
                  无缝打通群组管理、多维表格、消息卡片与机器人。实现信息在飞书与业务系统间的双向流动。
                </p>
                <div className="grid grid-cols-2 gap-x-12 gap-y-6 pt-6">
                  {['智能建群/定点拉人', '多维表格多路同步', '结项报告AI生成', '自动化督办推送'].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-base font-bold text-slate-600">
                      <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative z-10 flex-1 w-full max-w-xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-[56px] blur-[120px] opacity-10" />
                  <div className="relative bg-white/60 backdrop-blur-2xl border border-white rounded-[64px] p-16 overflow-hidden shadow-2xl border-slate-100">
                    <div className="flex items-start gap-6 mb-12">
                      <div className="w-14 h-14 bg-slate-950 rounded-2xl shadow-2xl" />
                      <div className="space-y-4 flex-1">
                        <div className="h-6 bg-slate-200/40 rounded-full w-4/5 shadow-inner" />
                        <div className="h-3.5 bg-slate-100/50 rounded-full w-3/5" />
                      </div>
                    </div>
                    <div className="space-y-6 pt-12 border-t border-slate-100/80">
                      {[1,2,3].map(i => (
                        <div key={i} className="flex items-center justify-between p-5 bg-white/70 rounded-2xl border border-slate-50 shadow-sm hover:translate-x-2 transition-transform duration-500">
                          <div className={cn("w-3 h-3 rounded-full", i === 1 ? "bg-orange-500 animate-pulse" : "bg-emerald-500")} />
                          <div className="h-3 bg-slate-50 rounded-full w-[160px]" />
                          <div className="px-4 py-1.5 bg-slate-100/50 rounded-xl text-[10px] font-black text-slate-400 tracking-widest uppercase">进行中</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Philosophy / Problem Solving Deep Dive */}
      <section id="vision" className="relative z-10 py-52 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tight leading-[1.05]">突破跨部门协同瓶颈</h2>
            <div className="w-32 h-2 bg-orange-500 mx-auto mt-12 rounded-full shadow-[0_5px_15px_rgba(249,115,22,0.3)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-40">
            <div className="space-y-8">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-50 flex items-center justify-center text-slate-950">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-black text-slate-950 tracking-tight">消除信息黑洞与碎片化</h4>
              <p className="text-slate-500 font-medium leading-[1.6] text-xl tracking-tight">
                以往大量决策、待办与风险淹没在飞书消息流，无人追踪。系统化后，每一项关键动态都将被 AI 识别并结构化存储，实现全流程 100% 透明化与可追溯，让过程管理真正落地。
              </p>
            </div>
            <div className="space-y-8">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-50 flex items-center justify-center text-slate-950">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-black text-slate-950 tracking-tight">告别低成本、高损耗的人工跟进</h4>
              <p className="text-slate-500 font-medium leading-[1.6] text-xl tracking-tight">
                传统模式依靠人肉提醒进度、收集周报。现在，系统根据预设的项目迭代节奏，自动触发多级阶段卡点与自动化催办，实现从“人驱动项目”到“系统驱动协作”的生产力跨越。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / High-End CTA - Fading into Infinity */}
      <footer className="relative z-10 py-32 text-center px-6 overflow-hidden bg-white">
        <motion.div
           initial={{ opacity: 0, scale: 0.96 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
           className="max-w-7xl mx-auto relative"
        >
          <div className="w-24 h-24 bg-slate-950 text-white rounded-[32px] flex items-center justify-center mx-auto mb-12 shadow-[0_40px_90px_rgba(0,0,0,0.3)] rotate-12 hover:rotate-0 transition-all duration-1000 cursor-pointer">
            <Briefcase className="w-12 h-12 -rotate-12 group-hover:rotate-0" />
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-slate-950 mb-16 tracking-tighter leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-slate-950 to-slate-800">
            赋能提效<br />
            让每一次迭代都有价值
          </h2>
          <div className="flex flex-col items-center gap-10">
            <button 
              onClick={onEnter}
              className="px-24 py-8 bg-slate-950 text-white rounded-[32px] font-black text-2xl hover:bg-orange-600 transition-all shadow-[0_60px_120px_-30px_rgba(249,115,22,0.45)] hover:translate-y-[-8px] active:scale-95"
            >
              进入项目管理工作台
            </button>
          </div>
        </motion.div>
        
        {/* Apple style fading floor refined */}
        <div className="absolute top-[90%] left-[-10%] w-[120%] h-[10%] bg-gradient-to-t from-slate-50 to-transparent opacity-60" />
      </footer>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
