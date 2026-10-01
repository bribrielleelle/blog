import React, { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, Check, Pin } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Pinterest',
      icon: Pin,
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-fredoka text-xs font-bold text-[#24201D] uppercase tracking-wider mr-1">
        Share:
      </span>

      {shareLinks.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share to ${item.name}`}
            className="p-2 rounded-xl bg-white border-2 border-[#24201D] text-[#24201D] hover:bg-[#27F2E4] shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label={`Share on ${item.name}`}
          >
            <Icon className="w-3.5 h-3.5" />
          </a>
        );
      })}

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-fredoka font-bold rounded-xl border-2 border-[#24201D] shadow-[2px_2px_0px_0px_#24201D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer ${
          copied
            ? 'bg-[#27F2E4] text-[#24201D]'
            : 'bg-white text-[#24201D] hover:bg-[#FAF7F2]'
        }`}
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Copy link</span>
          </>
        )}
      </button>
    </div>
  );
};
