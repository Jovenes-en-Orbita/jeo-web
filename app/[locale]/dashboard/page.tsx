"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { 
  Users, 
  FileText, 
  Mail, 
  Rss, 
  PlusCircle, 
  Shield, 
  Activity, 
  UserPlus, 
  UploadCloud, 
  Eye, 
  Briefcase, 
  Clock,
  Loader2,
  CheckCircle,
  Database
} from "lucide-react";

const DEPARTMENTS = [
  "Alianzas",
  "Gestión de Proyectos",
  "Gestión de Redes Sociales",
  "Información",
  "Programación",
  "Periodismo",
  "RRHH"
];

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // overview, users, register, audit, upload, my-uploads

  // Admin Data states
  const [usersList, setUsersList] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalPosts: 0,
    totalContacts: 0,
    totalSubscribers: 0
  });

  // User Data states
  const [myPosts, setMyPosts] = useState<any[]>([]);

  // Registration Form State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regDept, setRegDept] = useState(DEPARTMENTS[0]);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  // Upload Form State
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("Ciencia");
  const [postContent, setPostContent] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Verify auth session on load
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/");
          return;
        }
        const data = await res.json();
        if (data.authenticated) {
          setCurrentUser(data.user);
          // Set initial default tab depending on role
          setActiveTab(data.user.role === "ADMIN" ? "overview" : "upload");
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error(err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [router]);

  // Load Admin dashboard data
  const loadAdminData = async () => {
    try {
      const resAudit = await fetch("/api/admin/audit");
      if (resAudit.ok) {
        const data = await resAudit.json();
        setStats(data.stats);
        setAuditLogs(data.posts);
      }

      const resUsers = await fetch("/api/admin/users");
      if (resUsers.ok) {
        const data = await resUsers.json();
        setUsersList(data.users);
      }
    } catch (err) {
      console.error("Error fetching admin data", err);
    }
  };

  // Load User dashboard data
  const loadUserData = async () => {
    try {
      const res = await fetch("/api/posts");
      if (res.ok) {
        const data = await res.json();
        setMyPosts(data.posts);
      }
    } catch (err) {
      console.error("Error fetching user posts", err);
    }
  };

  // Fetch contextual data based on current tab and user role
  useEffect(() => {
    if (!currentUser) return;

    if (currentUser.role === "ADMIN") {
      loadAdminData();
    } else {
      loadUserData();
    }
  }, [currentUser, activeTab]);

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(false);
    setRegLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          department: regDept
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al registrar usuario");
      }

      setRegSuccess(true);
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      setRegDept(DEPARTMENTS[0]);
      // Reload admin data
      loadAdminData();
    } catch (err: any) {
      setRegError(err.message || "Error de red");
    } finally {
      setRegLoading(false);
    }
  };

  const handleUploadPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    setUploadSuccess(false);
    setUploadLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: postTitle,
          category: postCategory,
          content: postContent,
          imageUrl: postImageUrl
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al subir los datos");
      }

      setUploadSuccess(true);
      setPostTitle("");
      setPostContent("");
      setPostImageUrl("");
      setPostCategory("Ciencia");
      // Reload user data
      loadUserData();
    } catch (err: any) {
      setUploadError(err.message || "Error de red");
    } finally {
      setUploadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        <p className="text-zinc-400">Verificando sesión...</p>
      </div>
    );
  }

  if (!currentUser) return null;

  const isAdmin = currentUser.role === "ADMIN";

  return (
    <div className="min-h-screen bg-[#06070a] text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-red-950/60 border border-red-900/40 text-red-400 uppercase tracking-wide">
                {isAdmin ? "Administrador General" : `Personal • Depto. ${currentUser.department}`}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mt-2 font-heading">
              Hola, {currentUser.name || "Colaborador"}
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Bienvenido al centro de administración y carga de datos de la plataforma.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-zinc-950/40 border border-zinc-850 p-3 rounded-xl backdrop-blur">
            <Database className="h-5 w-5 text-red-500" />
            <div className="text-left">
              <p className="text-xs text-zinc-500">Sesión iniciada como</p>
              <p className="text-sm font-semibold text-white">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Navigation Sidebar */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 px-3 mb-2">Navegación</p>
            {isAdmin ? (
              <>
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    activeTab === "overview" 
                      ? "bg-red-600 text-white shadow-lg shadow-red-950/30" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800"
                  }`}
                >
                  <Activity className="h-4.5 w-4.5" />
                  Monitoreo General
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    activeTab === "users" 
                      ? "bg-red-600 text-white shadow-lg shadow-red-950/30" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800"
                  }`}
                >
                  <Users className="h-4.5 w-4.5" />
                  Usuarios Registrados
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    activeTab === "register" 
                      ? "bg-red-600 text-white shadow-lg shadow-red-950/30" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800"
                  }`}
                >
                  <UserPlus className="h-4.5 w-4.5" />
                  Registrar Personal
                </button>
                <button
                  onClick={() => setActiveTab("audit")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    activeTab === "audit" 
                      ? "bg-red-600 text-white shadow-lg shadow-red-950/30" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800"
                  }`}
                >
                  <Shield className="h-4.5 w-4.5" />
                  Auditoría de Datos
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab("upload")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    activeTab === "upload" 
                      ? "bg-red-600 text-white shadow-lg shadow-red-950/30" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800"
                  }`}
                >
                  <UploadCloud className="h-4.5 w-4.5" />
                  Subir Datos
                </button>
                <button
                  onClick={() => setActiveTab("my-uploads")}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
                    activeTab === "my-uploads" 
                      ? "bg-red-600 text-white shadow-lg shadow-red-950/30" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800"
                  }`}
                >
                  <FileText className="h-4.5 w-4.5" />
                  Mis Cargas ({myPosts.length})
                </button>
              </>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="border border-zinc-850 bg-[#0a0b0f]/80 rounded-2xl p-6 backdrop-blur">
              
              {/* ADMIN - OVERVIEW / MONITORING */}
              {activeTab === "overview" && isAdmin && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-white font-heading">Monitoreo General de la Plataforma</h2>
                    <p className="text-sm text-zinc-400 mt-1">Estadísticas en tiempo real del ecosistema de Jóvenes en Órbita.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-zinc-950/50 border border-zinc-850 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-zinc-400 mb-2">
                        <span className="text-xs uppercase tracking-wider font-semibold">Usuarios</span>
                        <Users className="h-4.5 w-4.5 text-blue-500" />
                      </div>
                      <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                    </div>

                    <div className="bg-zinc-950/50 border border-zinc-850 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-zinc-400 mb-2">
                        <span className="text-xs uppercase tracking-wider font-semibold">Datos Subidos</span>
                        <FileText className="h-4.5 w-4.5 text-red-500" />
                      </div>
                      <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
                    </div>

                    <div className="bg-zinc-950/50 border border-zinc-850 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-zinc-400 mb-2">
                        <span className="text-xs uppercase tracking-wider font-semibold">Contactos</span>
                        <Mail className="h-4.5 w-4.5 text-yellow-500" />
                      </div>
                      <p className="text-2xl font-bold text-white">{stats.totalContacts}</p>
                    </div>

                    <div className="bg-zinc-950/50 border border-zinc-850 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-zinc-400 mb-2">
                        <span className="text-xs uppercase tracking-wider font-semibold">Boletín</span>
                        <Rss className="h-4.5 w-4.5 text-green-500" />
                      </div>
                      <p className="text-2xl font-bold text-white">{stats.totalSubscribers}</p>
                    </div>
                  </div>

                  <div className="border border-zinc-850 rounded-xl overflow-hidden bg-zinc-950/30">
                    <div className="p-4 bg-zinc-950/60 border-b border-zinc-850 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Cargas Recientes de la Organización</h3>
                      <button 
                        onClick={() => setActiveTab("audit")} 
                        className="text-xs text-red-500 hover:text-red-400 font-semibold"
                      >
                        Ver todo
                      </button>
                    </div>
                    
                    {auditLogs.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 text-sm">No se han registrado subidas de datos aún.</div>
                    ) : (
                      <div className="divide-y divide-zinc-900">
                        {auditLogs.slice(0, 5).map((post) => (
                          <div key={post.id} className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-950/40 transition-all">
                            <div>
                              <p className="text-sm font-medium text-white">{post.title}</p>
                              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                                <span>{post.category}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-semibold text-zinc-300">
                                {post.author ? post.author.name : "Admin/Sistema"}
                              </p>
                              <p className="text-[10px] text-zinc-500">
                                {post.author ? post.author.department : "Coordinación"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ADMIN - USERS LIST */}
              {activeTab === "users" && isAdmin && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-white font-heading">Usuarios de la Organización</h2>
                      <p className="text-sm text-zinc-400 mt-1">Colaboradores registrados con permisos de edición y administración.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("register")}
                      className="flex items-center gap-2 bg-red-650 hover:bg-red-650/80 px-3.5 py-2 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      Registrar Nuevo
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-zinc-850 rounded-xl">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="bg-zinc-950 border-b border-zinc-850 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                          <th className="px-6 py-4">Nombre</th>
                          <th className="px-6 py-4">Correo Electrónico</th>
                          <th className="px-6 py-4">Departamento</th>
                          <th className="px-6 py-4">Rol</th>
                          <th className="px-6 py-4">Registro</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {usersList.map((user) => (
                          <tr key={user.id} className="hover:bg-zinc-950/40 transition-all">
                            <td className="px-6 py-4 font-medium text-white">{user.name || "N/A"}</td>
                            <td className="px-6 py-4 text-zinc-300">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400">
                                {user.department || "N/A"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                user.role === "ADMIN" 
                                  ? "bg-red-950/50 border border-red-900/40 text-red-400" 
                                  : "bg-blue-950/50 border border-blue-900/40 text-blue-400"
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-zinc-500 text-xs">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ADMIN - REGISTER USER FORM */}
              {activeTab === "register" && isAdmin && (
                <div className="max-w-xl space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white font-heading">Registrar Miembro de la Organización</h2>
                    <p className="text-sm text-zinc-400 mt-1">Crea un usuario para otorgarle acceso a la plataforma.</p>
                  </div>

                  {regError && (
                    <div className="rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-sm text-red-400">
                      {regError}
                    </div>
                  )}

                  {regSuccess && (
                    <div className="rounded-lg bg-green-950/40 border border-green-900/60 p-3 text-sm text-green-400 flex items-center gap-2 animate-fade-in-up">
                      <CheckCircle className="h-5 w-5" />
                      ¡Usuario de la organización creado exitosamente!
                    </div>
                  )}

                  <form onSubmit={handleRegisterUser} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Ej. Santiago García"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 px-4 text-sm text-white focus:border-red-650 focus:outline-none focus:ring-1 focus:ring-red-650 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Correo Electrónico</label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="ejemplo@jovenesenorbita.com"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 px-4 text-sm text-white focus:border-red-650 focus:outline-none focus:ring-1 focus:ring-red-650 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Contraseña Inicial</label>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 px-4 text-sm text-white focus:border-red-650 focus:outline-none focus:ring-1 focus:ring-red-650 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Departamento</label>
                      <select
                        value={regDept}
                        onChange={(e) => setRegDept(e.target.value)}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 px-4 text-sm text-white focus:border-red-650 focus:outline-none focus:ring-1 focus:ring-red-650 transition-all"
                      >
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept} className="bg-[#0c0d12]">
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={regLoading}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 py-3 text-sm font-semibold text-white transition-all disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-red-950/30"
                    >
                      {regLoading ? (
                        <>
                          <Loader2 className="h-4.5 w-4.5 animate-spin" />
                          Creando usuario...
                        </>
                      ) : (
                        "Registrar Usuario"
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* ADMIN - AUDIT LOGS */}
              {activeTab === "audit" && isAdmin && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white font-heading">Auditoría de Carga de Datos</h2>
                    <p className="text-sm text-zinc-400 mt-1">Monitorea qué datos fueron subidos, la fecha de publicación y quién los cargó.</p>
                  </div>

                  <div className="border border-zinc-850 rounded-xl overflow-hidden">
                    {auditLogs.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 text-sm">No se han registrado datos.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm">
                          <thead>
                            <tr className="bg-zinc-950 border-b border-zinc-850 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                              <th className="px-6 py-4">Datos (Título)</th>
                              <th className="px-6 py-4">Categoría</th>
                              <th className="px-6 py-4">Fecha Carga</th>
                              <th className="px-6 py-4">Cargado Por</th>
                              <th className="px-6 py-4">Departamento</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-900">
                            {auditLogs.map((post) => (
                              <tr key={post.id} className="hover:bg-zinc-950/40 transition-all">
                                <td className="px-6 py-4">
                                  <div className="max-w-xs truncate font-medium text-white">{post.title}</div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-950/20 text-red-400 border border-red-900/20">
                                    {post.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-zinc-400 text-xs">
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                  <p className="font-medium text-zinc-200">{post.author ? post.author.name : "Admin/Sistema"}</p>
                                  <p className="text-xs text-zinc-500">{post.author ? post.author.email : "Coordinador"}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
                                    <Briefcase className="h-3.5 w-3.5 text-zinc-500" />
                                    {post.author ? post.author.department : "Coordinación"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* USER - UPLOAD POST FORM */}
              {activeTab === "upload" && !isAdmin && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white font-heading">Subir Datos Astronómicos / Contenido</h2>
                    <p className="text-sm text-zinc-400 mt-1">Carga nuevos descubrimientos o publicaciones directamente a la base de datos de la plataforma.</p>
                  </div>

                  {uploadError && (
                    <div className="rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-sm text-red-400">
                      {uploadError}
                    </div>
                  )}

                  {uploadSuccess && (
                    <div className="rounded-lg bg-green-950/40 border border-green-900/60 p-3 text-sm text-green-400 flex items-center gap-2 animate-fade-in-up">
                      <CheckCircle className="h-5 w-5" />
                      ¡Los datos han sido subidos exitosamente!
                    </div>
                  )}

                  <form onSubmit={handleUploadPost} className="space-y-4 max-w-2xl">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Título del Post / Registro</label>
                      <input
                        type="text"
                        required
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="Ej. Descubrimiento de nuevo exoplaneta en la órbita de Gliese 581"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 px-4 text-sm text-white focus:border-red-650 focus:outline-none focus:ring-1 focus:ring-red-650 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Categoría</label>
                        <select
                          value={postCategory}
                          onChange={(e) => setPostCategory(e.target.value)}
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 px-4 text-sm text-white focus:border-red-650 focus:outline-none focus:ring-1 focus:ring-red-650 transition-all"
                        >
                          <option value="Ciencia" className="bg-[#0c0d12]">Ciencia</option>
                          <option value="Tecnología" className="bg-[#0c0d12]">Tecnología</option>
                          <option value="Exploración" className="bg-[#0c0d12]">Exploración</option>
                          <option value="Historia" className="bg-[#0c0d12]">Historia</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">URL de Imagen (Opcional)</label>
                        <input
                          type="url"
                          value={postImageUrl}
                          onChange={(e) => setPostImageUrl(e.target.value)}
                          placeholder="https://ejemplo.com/imagen.jpg"
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 px-4 text-sm text-white focus:border-red-650 focus:outline-none focus:ring-1 focus:ring-red-650 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Contenido / Datos Registrados</label>
                      <textarea
                        required
                        rows={6}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Escribe la información detallada del post aquí..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 px-4 text-sm text-white focus:border-red-650 focus:outline-none focus:ring-1 focus:ring-red-650 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={uploadLoading}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-650 hover:bg-red-655 py-3 text-sm font-semibold text-white transition-all disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-red-950/30"
                    >
                      {uploadLoading ? (
                        <>
                          <Loader2 className="h-4.5 w-4.5 animate-spin" />
                          Subiendo datos...
                        </>
                      ) : (
                        "Publicar / Guardar Registro"
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* USER - MY UPLOADS */}
              {activeTab === "my-uploads" && !isAdmin && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white font-heading">Mis Datos Cargados</h2>
                    <p className="text-sm text-zinc-400 mt-1">Lista de todos los registros y posts astronómicos que has subido.</p>
                  </div>

                  {myPosts.length === 0 ? (
                    <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500">
                      Aún no has registrado ningún dato. ¡Usa la pestaña de carga de arriba!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {myPosts.map((post) => (
                        <div key={post.id} className="bg-zinc-950/40 border border-zinc-850 p-5 rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-all">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-red-950/30 border border-red-900/30 text-red-400 uppercase">
                                {post.category}
                              </span>
                              <span className="text-xs text-zinc-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="font-bold text-white text-base leading-tight mb-2">{post.title}</h3>
                            <p className="text-zinc-400 text-sm line-clamp-3 mb-4">{post.content}</p>
                          </div>
                          {post.imageUrl && (
                            <div className="relative h-24 w-full overflow-hidden rounded-lg border border-zinc-900 mt-2 mb-2">
                              <img 
                                src={post.imageUrl} 
                                alt={post.title}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
