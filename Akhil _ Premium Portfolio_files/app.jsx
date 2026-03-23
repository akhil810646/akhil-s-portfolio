const { useState, useEffect, useRef, useLayoutEffect } = React;
const { motion, AnimatePresence } = window.Motion;
const { gsap } = window;

// --- ICONS --- //
const IconDownload = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>;
const IconGithub = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>;
const IconLinkedin = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
const IconMail = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const IconEdit = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>;
const IconClose = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;

// --- DEFAULT STATE (Updated V3 with real CV Data) --- //
const defaultState = {
    hero: { name: "AKHIL KUMAR", title: "Software Developer", image: "akhil_hero.jpg" },
    about: {
        text: "I am a passionate software developer specializing in Python, C/C++, and Full-Stack web technologies. My core focus lies in engineering data-driven and intelligent solutions.",
        highlights: [
            "Developed Machine Learning models (Random Forest) predicting real-world water footprints.",
            "Architected IoT-based live health monitoring devices using ESP32 and Arduino.",
            "Crafted high-performance applications integrating C++ data structures and dynamic architectures."
        ],
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
    },
    skills: [
        { name: "C / C++ / Python", level: 90 },
        { name: "Machine Learning", level: 85 },
        { name: "IoT Devices / ESP32", level: 80 },
        { name: "HTML / CSS / JS", level: 85 }
    ],
    projects: [
        {
            id: 1,
            title: "Water Footprint ML",
            ext: "Python, RF, ESP32",
            image: "proj_water.png",
            points: [
                "Leveraged Random Forest models for high-accuracy footprint prediction.",
                "Integrated ESP32 for real-time sensor data collection.",
                "Automated data analysis for sustainable water management."
            ]
        },
        {
            id: 2,
            title: "Smart Health IoT",
            ext: "IoT, ESP32, Python",
            image: "proj_health.png",
            points: [
                "Real-time heart rate and oxygen monitoring via medical-grade sensors.",
                "Architected a live dashboard for remote patient tracking.",
                "Implemented an automated alert system for critical vital anomalies."
            ]
        },
        {
            id: 3,
            title: "Data Structures",
            ext: "C/C++",
            image: "proj_ds.png",
            points: [
                "Optimized algorithms for large-scale data processing in C++.",
                "Implemented balanced trees and complex graph algorithms.",
                "Memory-efficient data management for high-concurrency systems."
            ]
        }
    ],
    certifications: [
        { id: 1, title: "NPTEL Privacy & Security", image: "cert_nptel_v2.jpg" },
        { id: 2, title: "ChatGPT-4 AI & LLM", image: "cert_infosys.jpg" },
        { id: 3, title: "Computational Theory: Language Principle & Finite Automata Theory", image: "cert_infosys2.jpg" },
        { id: 4, title: "Build Generative AI Apps and Solutions with No-Code Tools", image: "cert_infosys1.jpg" }
    ],
    education: [
        { year: "Aug '23 - Present", degree: "B.Tech Computer Science (5.61)", school: "Lovely Professional University" },
        { year: "Sep '21 - Mar '23", degree: "Intermediate (85%)", school: "SR Junior College" },
        { year: "Apr '20 - Mar '21", degree: "Schooling (100%)", school: "Little Flower High School" }
    ],
    contact: { email: "banothakhil417@gmail.com", github: "https://github.com/akhil810646", linkedin: "https://www.linkedin.com/in/akhilkumar-d44" }
};

// --- HELPERS --- //
const Navbar = ({ isEditing }) => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="fixed top-10 left-10 z-[150] flex flex-col gap-6 items-start">
            {['about', 'projects', 'contact'].map(item => (
                <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className="group flex items-center gap-4 transition-all duration-500"
                >
                    <div className="h-[1px] w-0 bg-white group-hover:w-8 transition-all duration-500"></div>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white font-bold transition-colors">
                        {item}
                    </span>
                </button>
            ))}
        </nav>
    );
};

const EditableInput = ({ value, isEditing, onChange, className }) => {
    if (isEditing) {
        return <input type="text" value={value} onChange={e => onChange(e.target.value)} className={`bg-transparent border-b border-white/50 focus:outline-none focus:border-white w-full ${className}`} />;
    }
    return <span className={className}>{value}</span>;
};

const EditableTextarea = ({ value, isEditing, onChange, className }) => {
    if (isEditing) {
        return <textarea value={value} onChange={e => onChange(e.target.value)} className={`bg-transparent border border-white/30 rounded p-2 focus:outline-none focus:border-white w-full ${className}`} rows={4} />;
    }
    return <p className={className}>{value}</p>;
};

// --- SECTIONS --- //

const Hero = ({ data, isEditing, updateData }) => {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={data.image} alt="Hero bg" className="w-full h-full object-cover filter grayscale contrast-125 select-none opacity-80" />
                {/* A deep radial/linear gradient blend for extreme dramatic effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/30 via-transparent to-[#070707]"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center animate-float">
                {/* Massive Typography */}
                <h1 className="text-[12vw] leading-none font-display font-bold tracking-tighter text-white" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.9)' }}>
                    <EditableInput value={data.name} isEditing={isEditing} onChange={v => updateData('hero', 'name', v)} className="text-center" />
                </h1>

                <h2 className="mt-8 text-xl md:text-3xl font-light text-white tracking-[0.4em] uppercase backdrop-blur-md px-8 py-3 rounded-full border border-white/10 bg-black/40 shadow-2xl">
                    <EditableInput value={data.title} isEditing={isEditing} onChange={v => updateData('hero', 'title', v)} className="text-center" />
                </h2>

                <motion.a
                    href="Akhil_CV.pdf" target="_blank"
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px rgba(255,255,255,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-16 group relative flex items-center gap-4 px-10 py-5 rounded-full border border-white/40 bg-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white hover:bg-white/20"
                >
                    <span className="relative z-10 font-bold tracking-widest uppercase text-sm md:text-base text-white">Download Resume</span>
                    <IconDownload className="relative z-10 w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
                </motion.a>
            </div>

            <div className="absolute bottom-6 md:bottom-12 flex flex-col items-center text-white/50 animate-bounce">
                <span className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-4">Slide Up</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    );
};

const About = ({ data, isEditing, updateData }) => {
    const sectionRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(sectionRef.current, { y: 100, opacity: 0 }, { scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }, y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-32 px-6 md:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 space-y-10 glass-panel p-10 rounded-3xl animate-float border border-white/5 bg-black/40 shadow-[0_0_40px_rgba(255,255,255,0.02)]" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-white/30"></div>
                    <h3 className="text-xs tracking-[0.3em] uppercase text-white/50 font-bold">About the Engineer</h3>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif italic font-light leading-snug text-white/90">
                    <EditableTextarea value={data.text} isEditing={isEditing} onChange={v => updateData('about', 'text', v)} className="bg-transparent border-none w-full outline-none resize-none" />
                </h2>

                <div className="pt-6 space-y-4">
                    {data.highlights && data.highlights.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                            <div className="w-2 h-2 mt-2 rounded-full border border-white/50 bg-white/10 shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:bg-white transition-colors duration-300"></div>
                            <div className="text-white/70 font-light tracking-wide text-lg leading-relaxed w-full">
                                {isEditing ? (
                                    <EditableInput value={point} isEditing={true} onChange={v => {
                                        const newHighlights = [...data.highlights];
                                        newHighlights[idx] = v;
                                        updateData('about', 'highlights', newHighlights);
                                    }} className="w-full text-white" />
                                ) : (
                                    <span>{point}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 w-full aspect-square lg:aspect-auto lg:h-[750px] overflow-hidden rounded-3xl filter grayscale contrast-125 border border-white/10 shadow-2xl relative group">
                <img src={data.image} alt="Profile" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-10 left-10 right-10 flex border-t border-white/20 pt-6">
                    <div>
                        <p className="text-white/50 text-xs tracking-widest uppercase font-bold mb-1">Status</p>
                        <p className="text-white text-lg font-light tracking-wider italic font-serif">Open to New Opportunities...</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Skills = ({ data }) => {
    const sectionRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(sectionRef.current, { y: 100, opacity: 0 }, { scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" });
    }, []);
    return (
        <section ref={sectionRef} className="py-32 px-6 md:px-20 max-w-4xl mx-auto relative z-10">
            <h3 className="text-5xl font-display font-light mb-20 text-center tracking-wide uppercase">Skills</h3>
            <div className="space-y-12">
                {data.map((skill, i) => (
                    <div key={i} className="space-y-5">
                        <div className="flex justify-between text-lg font-medium tracking-widest uppercase text-white/80">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/10">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Projects = ({ featuredData, githubUsername }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(sectionRef.current, { y: "100vh" }, { scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "top top", scrub: 1 }, y: 0, ease: "none" });
    }, []);

    const placeholders = [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?q=80&w=2070&auto=format&fit=crop"
    ];

    const getMatchedRepoUrl = (projTitle) => {
        return `https://github.com/${githubUsername}`;
    };

    return (
        <section id="projects" ref={sectionRef} className="py-32 px-6 md:px-20 max-w-7xl mx-auto relative z-10">
            <h3 className="text-5xl font-display font-light mb-20 tracking-wide text-center uppercase">Projects</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
                {featuredData.map((proj, i) => {
                    const isPdf = proj.image && proj.image.toLowerCase().endsWith('.pdf');
                    return (
                        <motion.div
                            key={proj.id}
                            whileHover={{ y: -15 }}
                            onClick={() => {
                                if (isPdf) {
                                    window.open(proj.image, '_blank');
                                } else {
                                    window.open(getMatchedRepoUrl(proj.title), '_blank');
                                }
                            }}
                            className="group cursor-pointer glass-panel rounded-2xl overflow-hidden animate-float border border-white/10 shadow-2xl flex flex-col items-start text-left"
                            style={{ animationDelay: `${i * 0.5}s` }}
                        >
                            <div className="w-full h-72 overflow-hidden relative flex-shrink-0">
                                {isPdf ? (
                                    <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center text-white/50 border-b border-white/10">
                                        <IconDownload className="w-16 h-16 mb-4" />
                                        <span className="text-xs uppercase tracking-widest font-bold px-10 text-center">Project Documentation (PDF)</span>
                                    </div>
                                ) : (
                                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-[2s] group-hover:scale-110" />
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="px-8 py-3 border border-white rounded-full text-sm font-bold uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">{isPdf ? "View PDF" : "View on GitHub"}</span>
                                </div>
                            </div>
                            <div className="p-8 bg-black/80 backdrop-blur-md flex-1 w-full space-y-6">
                                <div>
                                    <h4 className="text-2xl font-light tracking-wide">{proj.title}</h4>
                                    <p className="text-[10px] text-gray-500 mt-2 tracking-[0.2em] uppercase font-bold">{proj.ext}</p>
                                </div>

                                {proj.points && (
                                    <ul className="space-y-3 pt-2">
                                        {proj.points.map((p, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-white/30 shrink-0"></div>
                                                <p className="text-white/60 text-xs leading-relaxed font-light">{p}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

const Certifications = ({ data }) => {
    const [selected, setSelected] = useState(null);
    return (
        <section className="py-32 bg-[#050505] border-y border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-20">
                <h3 className="text-5xl font-display font-light mb-20 text-center tracking-wide">Certifications</h3>
                <div className="flex flex-wrap justify-center gap-10">
                    {data.map(cert => {
                        const isPdf = cert.image && cert.image.toLowerCase().endsWith('.pdf');
                        return (
                            <motion.div
                                key={cert.id}
                                whileHover={{ scale: 1.03 }}
                                onClick={() => setSelected(cert)}
                                className="w-full md:w-[450px] h-[300px] glass-panel p-2 rounded-2xl cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-[1s] flex flex-col items-center justify-center bg-white/5 overflow-hidden"
                            >
                                {isPdf ? (
                                    <div className="text-center text-white/50">
                                        <IconDownload className="w-16 h-16 mx-auto mb-4" />
                                        <span className="font-bold tracking-[0.2em] text-xs uppercase px-4 text-center block leading-relaxed">{cert.title}<br /><br />(Click to View PDF)</span>
                                    </div>
                                ) : (
                                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover rounded-xl border border-white/10" />
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            </div>
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 md:p-10 cursor-pointer backdrop-blur-lg"
                    >
                        <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} transition={{ type: 'spring', damping: 25 }} className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center">
                            <button className="absolute -top-16 right-0 text-white/50 hover:text-white transition-colors duration-300 z-[150]"><IconClose className="w-10 h-10" /></button>
                            {selected.image && selected.image.toLowerCase().endsWith('.pdf') ? (
                                <iframe src={selected.image} className="w-full h-full rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/20 bg-white" />
                            ) : (
                                <img src={selected.image} alt={selected.title} className="w-auto max-h-full rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/20" />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const Education = ({ data }) => {
    const sectionRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(sectionRef.current, { opacity: 0, x: -50 }, { scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }, opacity: 1, x: 0, duration: 1.5 });
    }, []);
    return (
        <section ref={sectionRef} className="py-32 px-6 md:px-20 max-w-3xl mx-auto relative z-10">
            <h3 className="text-5xl font-display font-light mb-20 tracking-wide text-center">Academic Journey</h3>
            <div className="border-l-2 border-white/10 pl-10 space-y-16 relative">
                {data.map((edu, i) => (
                    <div key={i} className="relative group">
                        <div className="absolute -left-[45px] top-1 w-5 h-5 bg-[#070707] border-2 border-white/50 rounded-full group-hover:border-white transition-colors duration-500 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        <span className="text-sm tracking-[0.3em] text-white/40 uppercase">{edu.year}</span>
                        <h4 className="text-3xl font-light mt-3 tracking-wide">{edu.degree}</h4>
                        <p className="text-white/60 mt-2 text-lg font-light tracking-wide">{edu.school}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Contact = ({ data, isEditing, updateData }) => {
    const sectionRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(sectionRef.current, { y: 100, opacity: 0 }, { scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" });
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="py-32 px-6 flex flex-col items-center text-center relative z-10 bg-[#040404] border-t border-white/5 mt-20">
            <h3 className="text-6xl md:text-8xl font-display font-bold mb-16 animate-pulse tracking-tighter text-glow" style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>Let's Connect</h3>
            <div className="flex gap-12 mb-20 animate-float">
                <a href={`mailto:${data.email}`} className="text-white/40 hover:text-white hover:-translate-y-3 transition-all duration-500 drop-shadow-lg"><IconMail className="w-10 h-10" /></a>
                <a href={data.github} target="_blank" className="text-white/40 hover:text-white hover:-translate-y-3 transition-all duration-500 drop-shadow-lg"><IconGithub className="w-10 h-10" /></a>
                <a href={data.linkedin} target="_blank" className="text-white/40 hover:text-white hover:-translate-y-3 transition-all duration-500 drop-shadow-lg"><IconLinkedin className="w-10 h-10" /></a>
            </div>

            {isEditing && (
                <div className="w-full max-w-md space-y-6 mb-16 glass-panel p-8 rounded-2xl border border-white/20">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-bold">Edit Links</p>
                    <EditableInput value={data.email} isEditing={true} onChange={v => updateData('contact', 'email', v)} className="text-base text-center" />
                    <EditableInput value={data.github} isEditing={true} onChange={v => updateData('contact', 'github', v)} className="text-base text-center" />
                    <EditableInput value={data.linkedin} isEditing={true} onChange={v => updateData('contact', 'linkedin', v)} className="text-base text-center" />
                </div>
            )}

            <p className="text-xs text-white/30 tracking-[0.4em] uppercase">© {new Date().getFullYear()} {defaultState.hero.name}. Anti-Gravity Field Stable.</p>
        </section>
    );
};

// --- APP ROOT --- //
const App = () => {
    // We use a new localStorage key so the user gets the updated cinematic photo immediately
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('akhil_portfolio_v16');
        return saved ? JSON.parse(saved) : defaultState;
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        localStorage.setItem('akhil_portfolio_v16', JSON.stringify(data));
    }, [data]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    const updateData = (section, field, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    return (
        <div className="relative bg-[#070707] w-full min-h-screen font-sans">
            <Navbar isEditing={isEditing} />

            {/* Edit Mode Toggle */}
            <button
                onClick={() => setIsEditing(!isEditing)}
                className={`fixed top-8 right-8 z-[200] p-4 rounded-full backdrop-blur-xl border transition-all duration-500 shadow-2xl ${isEditing ? 'bg-white text-black border-white' : 'bg-black/30 text-white border-white/20 hover:bg-white/10'}`}
            >
                {isEditing ? <IconClose className="w-6 h-6" /> : <IconEdit className="w-6 h-6" />}
            </button>

            {isEditing && (
                <div className="fixed top-28 right-8 z-[200] bg-white/10 backdrop-blur-2xl border border-white/30 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-2xl animate-pulse">
                    Edit Mode Active
                </div>
            )}

            {/* STICKY HERO BACKGROUND */}
            <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
                <Hero data={data.hero} isEditing={isEditing} updateData={updateData} />
            </div>

            {/* CONTINUOUS SCROLL CONTENT SECTION */}
            <div className="relative z-10 bg-[#070707] shadow-[0_-40px_80px_rgba(0,0,0,1)] border-t border-white/10 rounded-t-[3rem] mt-[-3rem] pt-[3rem]">
                <About data={data.about} isEditing={isEditing} updateData={updateData} />
                <Skills data={data.skills} />
                <Projects featuredData={data.projects} githubUsername={data.contact && data.contact.github ? data.contact.github.split('/').filter(Boolean).pop() : "akhil810646"} />
                <Certifications data={data.certifications} />
                <Education data={data.education} />
                <Contact data={data.contact} isEditing={isEditing} updateData={updateData} />
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
