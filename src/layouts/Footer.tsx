"use client";

import type React from "react";

import { useState } from "react";
import {
  Brain,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Award,
  HelpCircle,
  FileText,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FooterProps {
  customClass?: string;
}

export default function Footer({ customClass = "" }: FooterProps) {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("Español");

  const languages = [
    "English",
    "Español",
    "Français",
    "Deutsch",
    "中文",
    "日本語",
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Suscrito con:", email);
    setEmail("");
  };

  return (
    <footer className={cn("bg-blue-600 text-white mt-auto", customClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 lg:py-12 border-b border-blue-500">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-lg">
                <Brain className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-white/70 mr-2" />
                  <span className="text-white font-bold text-xl">LearnHub</span>
                </div>
                <p className="text-white/70 text-sm">
                  Aprende. Crece. Triunfa.
                </p>
              </div>
            </div>
            <p className="text-white/70 max-w-md">
              Plataforma educativa líder que ofrece cursos interactivos,
              recursos de aprendizaje y herramientas para estudiantes de todos
              los niveles.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                { icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
              ].map((social) => (
                <Button
                  key={social.label}
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white text-blue-600 hover:bg-blue-100"
                  aria-label={social.label}
                  asChild
                >
                  <a href="#">{social.icon}</a>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Suscríbete a nuestro boletín
            </h3>
            <p className="text-white/70">
              Recibe actualizaciones sobre nuevos cursos, recursos y consejos de
              aprendizaje.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="bg-white text-gray-800"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                className="flex items-center bg-white text-blue-600 hover:bg-blue-100"
              >
                <span>Suscribir</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-100"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(language === lang && "font-medium")}
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 py-8 lg:py-12 border-b border-blue-500">
          {[
            {
              title: "Aprendizaje",
              links: [
                "Todos los cursos",
                "Rutas de aprendizaje",
                "Certificaciones",
                "Tutorías",
                "Ejercicios prácticos",
                "Evaluaciones",
              ],
            },
            {
              title: "Recursos",
              links: [
                "Biblioteca",
                "Artículos",
                "Podcasts",
                "Webinars",
                "Glosario",
                "Herramientas",
              ],
            },
            {
              title: "Comunidad",
              links: [
                "Foros",
                "Eventos",
                "Grupos de estudio",
                "Mentores",
                "Historias de éxito",
                "Blog",
              ],
            },
            {
              title: "Empresa",
              links: [
                "Sobre nosotros",
                "Equipo",
                "Carreras",
                "Socios",
                "Afiliados",
                "Contacto",
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 lg:py-12">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Contacto</h3>
            <ul className="space-y-3">
              {[
                {
                  icon: <Mail className="w-4 h-4 text-white/70" />,
                  content: "info@learnhub.com",
                  href: "mailto:info@learnhub.com",
                },
                {
                  icon: <Phone className="w-4 h-4 text-white/70" />,
                  content: "+1 (234) 567-890",
                  href: "tel:+123456789",
                },
                {
                  icon: <MapPin className="w-4 h-4 text-white/70" />,
                  content:
                    "Calle Educación 123, Ciudad del Conocimiento, CP 12345",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <span className="text-white/70">{item.content}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">
              Reconocimientos
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: <Award className="w-4 h-4 text-yellow-300" />,
                  text: "Mejor Plataforma Educativa 2024",
                },
                {
                  icon: <Users className="w-4 h-4 text-white/70" />,
                  text: "+1M Estudiantes",
                },
                {
                  icon: <Shield className="w-4 h-4 text-white/70" />,
                  text: "Certificado ISO 27001",
                },
              ].map((badge, index) => (
                <Card
                  key={index}
                  className="flex items-center gap-2 bg-blue-500/30 px-3 py-1.5 rounded-md border-0 text-white"
                >
                  {badge.icon}
                  <span className="text-sm">{badge.text}</span>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Legal</h3>
            <ul className="space-y-3">
              {[
                {
                  icon: <FileText className="w-4 h-4" />,
                  text: "Términos y condiciones",
                },
                {
                  icon: <Shield className="w-4 h-4" />,
                  text: "Política de privacidad",
                },
                {
                  icon: <HelpCircle className="w-4 h-4" />,
                  text: "Centro de ayuda",
                },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-blue-500">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} LearnHub. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4">
            {["Mapa del sitio", "Accesibilidad", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/70 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
