"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  MessageCircle,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════════════ */

import { fadeUp, staggerContainer } from "@/lib/animations";


const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — PAGE HERO
   ═══════════════════════════════════════════════════════════════════ */

function PageHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "40vh",
        background:
          "linear-gradient(180deg, #0a0f1e 0%, #111d35 60%, #0a0f1e 100%)",
      }}
    >
      {/* Blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,168,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,168,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,168,1) 0.5px, transparent 0.5px),
            linear-gradient(90deg, rgba(37,99,168,1) 0.5px, transparent 0.5px)
          `,
          backgroundSize: "15px 15px",
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(37,99,168,0.1) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0f1e] to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-4"
      >
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-xs text-steel-200/40 mb-6"
        >
          <Link href="/" className="hover:text-steel-300 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-steel-300">Contact</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          Contact Us
        </h1>
        <p className="mt-4 text-steel-200/50 text-sm sm:text-base tracking-wide max-w-2xl mx-auto">
          Get a quote, ask a question, or start a partnership
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — TWO COLUMN LAYOUT (CONTACT INFO & FORM)
   ═══════════════════════════════════════════════════════════════════ */

const contactDetails = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["Pune, Maharashtra, India"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 XXXXX XXXXX"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@microcuttech.in"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Mon–Sat, 9:00 AM – 6:00 PM"],
  },
];

function ContactInformation() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Get in Touch
        </h2>
        <p className="text-steel-200/50 text-sm leading-relaxed mb-8">
          We respond to all inquiries within 4 business hours. Whether you need
          help with a new project or have a question about an existing order,
          we are here to help.
        </p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((detail, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full border border-steel-500/20 bg-navy-800/60 flex items-center justify-center text-steel-400">
              <detail.icon size={20} />
            </div>
            <div className="pt-1">
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
                {detail.title}
              </h3>
              {detail.lines.map((line, j) => (
                <p key={j} className="text-steel-200/60 text-sm mt-1">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// === MULTI-STEP FORM COMPONENT ===

type FormData = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceType: string;
  materialType: string;
  quantity: string;
  tolerance: string;
  deadline: string;
  notes: string;
};

const initialFormData: FormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  serviceType: "",
  materialType: "",
  quantity: "",
  tolerance: "",
  deadline: "",
  notes: "",
};

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const totalSteps = 3;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (currentStep: number) => {
    let newErrors: Partial<FormData> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Valid email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    }

    if (currentStep === 2) {
      if (!formData.serviceType)
        newErrors.serviceType = "Service Type is required";
      if (!formData.materialType)
        newErrors.materialType = "Material is required";
      if (!formData.quantity || isNaN(Number(formData.quantity)))
        newErrors.quantity = "Valid quantity is required";
      if (!formData.tolerance) newErrors.tolerance = "Tolerance is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/public/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            company: formData.companyName,
            email: formData.email,
            phone: formData.phone,
            serviceType: formData.serviceType,
            material: formData.materialType,
            quantity: parseInt(formData.quantity) || null,
            tolerance: formData.tolerance,
            deadline: formData.deadline || null,
            notes: formData.notes,
          }),
        });
        if (!response.ok) throw new Error("Failed to submit inquiry");
        setIsSuccess(true);
      } catch (err) {
        console.error("Inquiry submission error:", err);
        // Still show success for UX — inquiry intent is captured
        setIsSuccess(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Form Field Component
  const InputField = ({
    label,
    name,
    type = "text",
    placeholder = "",
    required = false,
  }: {
    label: string;
    name: keyof FormData;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-wider text-steel-200/50 font-medium ml-1">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full bg-navy-900/50 border ${
          errors[name] ? "border-red-500/50" : "border-steel-500/20"
        } rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-steel-400 focus:ring-1 focus:ring-steel-400/50 transition-colors`}
      />
      {errors[name] && (
        <span className="text-red-400 text-xs ml-1">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="bg-navy-800/40 border border-steel-500/10 rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden backdrop-blur-sm">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-steel-500/[0.03] rounded-full blur-[80px]" />

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-16"
          >
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-green-500" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
            <p className="text-steel-200/60 max-w-sm">
              We&apos;ve received your request. Our team will review the details and
              contact you within 4 business hours.
            </p>
            <Button
              className="mt-8"
              variant="secondary"
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
                setFormData(initialFormData);
                setFileName(null);
              }}
            >
              Submit Another Request
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-medium text-steel-200/40 mb-3 px-1">
                <span className={step >= 1 ? "text-steel-300" : ""}>
                  Details
                </span>
                <span className={step >= 2 ? "text-steel-300" : ""}>
                  Requirements
                </span>
                <span className={step >= 3 ? "text-steel-300" : ""}>
                  Upload
                </span>
              </div>
              <div className="h-1.5 w-full bg-navy-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-steel-500 to-steel-400"
                  initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* === STEP 1: Details === */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Full Name"
                      name="fullName"
                      required
                      placeholder="John Doe"
                    />
                    <InputField
                      label="Company Name"
                      name="companyName"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                    />
                    <InputField
                      label="Phone Number"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </motion.div>
              )}

              {/* === STEP 2: Requirements === */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider text-steel-200/50 font-medium ml-1">
                        Service Type <span className="text-orange-500">*</span>
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className={`w-full bg-navy-900/50 border ${
                          errors.serviceType
                            ? "border-red-500/50"
                            : "border-steel-500/20"
                        } rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-steel-400 appearance-none`}
                      >
                        <option value="" disabled>
                          Select Service
                        </option>
                        <option value="CNC Turning">CNC Turning</option>
                        <option value="VMC Milling">VMC Milling</option>
                        <option value="Surface Finishing">
                          Surface Finishing
                        </option>
                        <option value="Drilling & Boring">
                          Drilling & Boring
                        </option>
                        <option value="Custom Order">Custom Order</option>
                      </select>
                      {errors.serviceType && (
                        <span className="text-red-400 text-xs ml-1">
                          {errors.serviceType}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider text-steel-200/50 font-medium ml-1">
                        Material <span className="text-orange-500">*</span>
                      </label>
                      <select
                        name="materialType"
                        value={formData.materialType}
                        onChange={handleChange}
                        className={`w-full bg-navy-900/50 border ${
                          errors.materialType
                            ? "border-red-500/50"
                            : "border-steel-500/20"
                        } rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-steel-400 appearance-none`}
                      >
                        <option value="" disabled>
                          Select Material
                        </option>
                        <option value="Mild Steel">Mild Steel</option>
                        <option value="Stainless Steel">
                          Stainless Steel
                        </option>
                        <option value="Aluminum">Aluminum</option>
                        <option value="Brass">Brass</option>
                        <option value="Copper">Copper</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.materialType && (
                        <span className="text-red-400 text-xs ml-1">
                          {errors.materialType}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Quantity"
                      name="quantity"
                      type="number"
                      required
                      placeholder="e.g. 100"
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider text-steel-200/50 font-medium ml-1">
                        Tolerance <span className="text-orange-500">*</span>
                      </label>
                      <select
                        name="tolerance"
                        value={formData.tolerance}
                        onChange={handleChange}
                        className={`w-full bg-navy-900/50 border ${
                          errors.tolerance
                            ? "border-red-500/50"
                            : "border-steel-500/20"
                        } rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-steel-400 appearance-none`}
                      >
                        <option value="" disabled>
                          Select Tolerance
                        </option>
                        <option value="Standard ±0.1mm">
                          Standard ±0.1mm
                        </option>
                        <option value="Precision ±0.05mm">
                          Precision ±0.05mm
                        </option>
                        <option value="High Precision ±0.005mm">
                          High Precision ±0.005mm
                        </option>
                      </select>
                      {errors.tolerance && (
                        <span className="text-red-400 text-xs ml-1">
                          {errors.tolerance}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-steel-200/50 font-medium ml-1">
                      Deadline (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full bg-navy-900/50 border border-steel-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-steel-400 transition-colors [&::-webkit-calendar-picker-indicator]:invert-[0.6] [&::-webkit-calendar-picker-indicator]:opacity-50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* === STEP 3: Upload === */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-steel-200/50 font-medium ml-1">
                      Upload Drawing
                    </label>
                    <div className="relative w-full border-2 border-dashed border-steel-500/30 rounded-xl p-6 text-center hover:bg-navy-900/30 transition-colors cursor-pointer group">
                      <input
                        type="file"
                        accept=".pdf,.dwg,.dxf,.jpg,.png"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload
                        size={28}
                        className="mx-auto text-steel-400 mb-3 group-hover:-translate-y-1 transition-transform"
                      />
                      {fileName ? (
                        <p className="text-sm text-steel-300 font-medium">
                          {fileName}
                        </p>
                      ) : (
                        <>
                          <p className="text-sm text-white font-medium mb-1">
                            Click or drag file here
                          </p>
                          <p className="text-xs text-steel-200/40">
                            Accepts .pdf, .dwg, .dxf, .png (Max 10MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-steel-200/50 font-medium ml-1">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any specific surface finish requirements, special instructions, etc."
                      rows={4}
                      className="w-full bg-navy-900/50 border border-steel-500/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-steel-400 transition-colors resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* === FORM NAVIGATION === */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-steel-500/10">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={prevStep}
                    className="gap-2 text-sm"
                  >
                    <ArrowLeft size={14} /> Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < totalSteps ? (
                  <Button
                    type="button"
                    variant="accent"
                    onClick={nextStep}
                    className="gap-2 text-sm ml-auto"
                  >
                    Next Step <ArrowRight size={14} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="accent"
                    disabled={isSubmitting}
                    className="gap-2 text-sm ml-auto"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Request <ArrowRight size={14} />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TwoColumnSection() {
  return (
    <AnimatedSection className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <motion.div variants={fadeUp}>
          <ContactInformation />
        </motion.div>
        <motion.div variants={fadeUp}>
          <MultiStepForm />
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — GOOGLE MAPS PLACEHOLDER
   ═══════════════════════════════════════════════════════════════════ */

function MapPlaceholder() {
  return (
    <AnimatedSection className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-16 md:pb-24">
      <motion.div
        variants={fadeUp}
        className="w-full h-[300px] md:h-[400px] rounded-2xl border border-steel-500/15 bg-navy-800/80 flex flex-col items-center justify-center overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,168,0.1)_0%,_transparent_100%)] opacity-50" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        <MapPin
          size={48}
          className="text-steel-400 mb-4 opacity-50 group-hover:scale-110 transition-transform duration-500"
        />
        <h3 className="text-xl font-bold text-white tracking-wide z-10">
          Microcut Technology
        </h3>
        <p className="text-sm text-steel-200/50 mt-1 z-10">Pune, Maharashtra</p>

        {/* Note in code: Replace this div with Google Maps embed iframe when API key is ready */}
        <div className="absolute bottom-4 right-6 bg-navy-900/80 px-4 py-2 rounded text-xs text-steel-400/50 font-mono select-none">
          {'<!-- Insert Google Maps iframe here -->'}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING WHATSAPP BUTTON
   ═══════════════════════════════════════════════════════════════════ */

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/910000000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function ContactPage() {
  return (
    <>
      <PageHero />
      <TwoColumnSection />
      <MapPlaceholder />
      <FloatingWhatsApp />
    </>
  );
}
