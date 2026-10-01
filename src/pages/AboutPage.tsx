import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles, BookOpen, PenTool, Coffee, Heart } from 'lucide-react';
import { primaryAuthor } from '../data/posts';

export const AboutPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 450);
  };

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Intro Header & Portrait Card */}
      <section>
        <div className="bg-white border-2 border-[#24201D] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[6px_6px_0px_0px_#24201D]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#27F2E4] border-2 border-[#24201D] rounded-full text-xs font-fredoka font-bold uppercase tracking-wider text-[#24201D] shadow-[2px_2px_0px_0px_#24201D]">
                <span className="w-2 h-2 rounded-full bg-[#24201D]" />
                <span>About The Author & Journal</span>
              </div>

              <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#24201D] leading-tight">
                Hello, I&apos;m Brielle. I write about slow craft, quiet design, and tangible living.
              </h1>

              <p className="font-instrument text-xl sm:text-2xl text-[#5A524B] leading-relaxed">
                Based in the mossy hills of the Pacific Northwest, I am a designer, essayist, and student of spatial harmony. This journal exists as an antidote to algorithmic noise and shallow feeds.
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#24201D] bg-[#F2ECE1] shadow-[5px_5px_0px_0px_#24201D]">
                <img
                  src={primaryAuthor.avatar}
                  alt="Brielle Davis portrait"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3 bg-white border-t-2 border-[#24201D] flex items-center justify-between text-xs font-fredoka font-bold text-[#24201D]">
                  <span>Brielle Davis</span>
                  <span className="px-2 py-0.5 bg-[#27F2E4] border border-[#24201D] rounded text-[10px]">STUDIO PORTRAIT · 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy Card */}
      <section className="bg-white border-2 border-[#24201D] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[6px_6px_0px_0px_#24201D] space-y-8">
        <div className="space-y-4 max-w-3xl">
          <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#24201D]">
            Why This Journal Exists
          </h2>
          <p className="editorial-drop-cap font-instrument text-xl text-[#362F2B] leading-relaxed">
            In 2023, I realized that despite spending fourteen hours a day surrounded by high-resolution screens and instantaneous communication tools, my sense of intellectual nourishment was withering. I felt over-informed and under-nourished.
          </p>
          <p className="font-instrument text-xl text-[#362F2B] leading-relaxed">
            I began stepping back. I replaced morning scrolling with ten pages of physical books. I swapped synthetic desk lamps for natural casement light. I began keeping a bound notebook with fountain pens, discovering that when the hand is forced to move at ink-speed, ideas mature into something durable.
          </p>
          <p className="font-instrument text-xl text-[#362F2B] leading-relaxed">
            This blog is an open record of that ongoing experiment. It is a home for readers who appreciate unhurried prose, tactile craftsmanship, and deliberate simplicity.
          </p>
        </div>

        {/* 4 Tenets of Slow Craft */}
        <div className="pt-6 space-y-6">
          <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-[#24201D] border-b-2 border-[#24201D] pb-3">
            The Four Tenets of Slow Craft
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-[#FAF7F2] border-2 border-[#24201D] rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#24201D]">
              <span className="font-fredoka text-xs font-bold text-[#24201D] bg-[#27F2E4] border border-[#24201D] px-2.5 py-0.5 rounded shadow-2xs">
                01
              </span>
              <h4 className="font-fredoka text-lg font-bold text-[#24201D] pt-1">
                Depth Over Speed
              </h4>
              <p className="font-instrument text-base text-[#5A524B] leading-relaxed">
                Better to write one thoughtful essay a fortnight than seven disposable threads a day. Ideas require brewing time.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] border-2 border-[#24201D] rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#24201D]">
              <span className="font-fredoka text-xs font-bold text-[#24201D] bg-[#27F2E4] border border-[#24201D] px-2.5 py-0.5 rounded shadow-2xs">
                02
              </span>
              <h4 className="font-fredoka text-lg font-bold text-[#24201D] pt-1">
                Tangible Grounding
              </h4>
              <p className="font-instrument text-base text-[#5A524B] leading-relaxed">
                Physical paper, ceramic glazes, natural textiles, and hand-cut timber remind us that we exist in bodily reality.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] border-2 border-[#24201D] rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#24201D]">
              <span className="font-fredoka text-xs font-bold text-[#24201D] bg-[#27F2E4] border border-[#24201D] px-2.5 py-0.5 rounded shadow-2xs">
                03
              </span>
              <h4 className="font-fredoka text-lg font-bold text-[#24201D] pt-1">
                Calm Technology
              </h4>
              <p className="font-instrument text-base text-[#5A524B] leading-relaxed">
                Software should serve human intention like an obedient tool, never demand our continuous biological panic.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] border-2 border-[#24201D] rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#24201D]">
              <span className="font-fredoka text-xs font-bold text-[#24201D] bg-[#27F2E4] border border-[#24201D] px-2.5 py-0.5 rounded shadow-2xs">
                04
              </span>
              <h4 className="font-fredoka text-lg font-bold text-[#24201D] pt-1">
                Beauty in the Ordinary
              </h4>
              <p className="font-instrument text-base text-[#5A524B] leading-relaxed">
                Morning steam rising from a porcelain bowl, raking shadows across a cedar sill—these are not interruptions; they are the point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Currently Reading & Studio Notes in Blush Card from Reference Design */}
      <section className="bg-[#FFDCE3] border-2 border-[#24201D] rounded-3xl p-8 sm:p-12 space-y-6 shadow-[6px_6px_0px_0px_#24201D]">
        <h3 className="font-fredoka text-2xl font-bold text-[#24201D]">
          Studio Colophon & Current Reads
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-fredoka text-xs">
          <div className="bg-white border-2 border-[#24201D] p-5 rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#24201D]">
            <div className="flex items-center gap-1.5 text-[#24201D] font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#24201D]" />
              <span>On My Nightstand</span>
            </div>
            <p className="font-instrument text-base text-[#362F2B]">
              In Praise of Shadows by Jun’ichirō Tanizaki
            </p>
            <p className="font-instrument text-base text-[#362F2B]">
              The Shape of Green by Lance Hosey
            </p>
          </div>

          <div className="bg-white border-2 border-[#24201D] p-5 rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#24201D]">
            <div className="flex items-center gap-1.5 text-[#24201D] font-bold uppercase tracking-wider">
              <PenTool className="w-3.5 h-3.5 text-[#24201D]" />
              <span>Daily Instruments</span>
            </div>
            <p className="font-instrument text-base text-[#362F2B]">
              Custom 823 Fountain Pen (Fine Nib)
            </p>
            <p className="font-instrument text-base text-[#362F2B]">
              Midori MD Cotton Notebook (A5 Grid)
            </p>
          </div>

          <div className="bg-white border-2 border-[#24201D] p-5 rounded-2xl space-y-2 shadow-[3px_3px_0px_0px_#24201D]">
            <div className="flex items-center gap-1.5 text-[#24201D] font-bold uppercase tracking-wider">
              <Coffee className="w-3.5 h-3.5 text-[#24201D]" />
              <span>Morning Ritual</span>
            </div>
            <p className="font-instrument text-base text-[#362F2B]">
              Ceremonial Uji Sencha steeped at 70°C in an unglazed Tokoname clay kyusu.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Contact Form */}
      <section id="contact-form" className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-[#24201D] rounded-full text-xs font-fredoka font-bold uppercase tracking-wider text-[#24201D] shadow-[2px_2px_0px_0px_#24201D]">
            <Mail className="w-3.5 h-3.5 text-[#27F2E4]" />
            <span>Direct Postal Box</span>
          </div>
          <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#24201D]">
            Send a Thought or Inquiry
          </h2>
          <p className="font-instrument text-lg text-[#5A524B]">
            I read every message personally. Whether it&apos;s a book recommendation, a question on slow design, or just a quiet greeting, I welcome your note.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border-2 border-[#24201D] rounded-3xl p-8 text-center space-y-3 shadow-[6px_6px_0px_0px_#24201D] animate-in fade-in">
            <CheckCircle2 className="w-12 h-12 text-[#24201D] mx-auto bg-[#27F2E4] border-2 border-[#24201D] rounded-full p-2 shadow-[2px_2px_0px_0px_#24201D]" />
            <h3 className="font-fredoka text-2xl font-bold text-[#24201D]">
              Message Received
            </h3>
            <p className="font-instrument text-lg text-[#6B625B]">
              Thank you for reaching out. I reply to correspondence on Tuesday and Thursday afternoons.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-fredoka font-bold text-[#24201D] underline hover:text-[#91735E] cursor-pointer pt-2"
            >
              Send another note
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border-2 border-[#24201D] rounded-3xl p-6 sm:p-8 space-y-4 shadow-[6px_6px_0px_0px_#24201D]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-fredoka font-bold text-[#24201D]">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara Vance"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-fredoka font-bold text-[#24201D]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="clara@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-fredoka font-bold text-[#24201D]">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Regarding your essay on architectural light..."
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-fredoka font-bold text-[#24201D]">
                Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Share your thoughts here..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border-2 border-[#24201D] rounded-xl text-sm text-[#24201D] placeholder-[#8A8177] focus:outline-hidden focus:ring-2 focus:ring-[#27F2E4] font-body-sans shadow-[2px_2px_0px_0px_#24201D]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#6B625B] font-body-sans">
                Expect a response within 48 hours.
              </span>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#27F2E4] hover:bg-[#1fe0d2] text-[#24201D] font-fredoka font-bold text-xs rounded-xl border-2 border-[#24201D] transition-all cursor-pointer flex items-center gap-2 shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
