import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, Lock, Eye, FileText, UserCheck, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/app/components/ui/scroll-area';

export const PrivacyPolicyScreen = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        'Personal identification information (Name, email address, phone number)',
        'Medical and health information necessary for providing pathology services',
        'Medicare and insurance details',
        'Appointment and test history',
        'Device and usage information for app improvement',
      ],
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'To provide and manage your pathology services',
        'To communicate test results and appointment details',
        'To process payments and insurance claims',
        'To improve our services and user experience',
        'To comply with legal and regulatory requirements',
      ],
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        'End-to-end encryption for all sensitive data',
        'Regular security audits and compliance checks',
        'Secure servers with 24/7 monitoring',
        'Multi-factor authentication options',
        'Staff training on privacy and data protection',
      ],
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access your personal and health information',
        'Request corrections to your data',
        'Request deletion of your data (subject to legal requirements)',
        'Opt-out of non-essential communications',
        'Lodge a complaint about data handling',
      ],
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: [
        'We never sell your personal information',
        'Information shared with your healthcare providers only with consent',
        'Required disclosures to regulatory bodies as mandated by law',
        'Third-party service providers bound by confidentiality agreements',
        'Anonymous data for research purposes (with explicit consent)',
      ],
    },
    {
      icon: AlertCircle,
      title: 'Data Retention',
      content: [
        'Medical records retained as per Australian law (minimum 7 years)',
        'Test results available in your account indefinitely',
        'Personal information retained while you have an active account',
        'Right to request data deletion (excluding legally required retention)',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">Privacy Policy</h1>
          <p className="text-sm opacity-90 mt-2">Last updated: February 2, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 max-w-4xl">
        {/* Introduction */}
        <div className="mb-8 p-6 bg-[#ADD8E6] bg-opacity-10 rounded-lg">
          <p className="text-[#A9A9A9] leading-relaxed">
            At Luna Clinical, we are committed to protecting your privacy and ensuring the security of your
            personal and health information. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information in accordance with the Australian Privacy Principles (APPs) and the
            Privacy Act 1988.
          </p>
        </div>

        {/* Policy Sections */}
        <ScrollArea className="h-[calc(100vh-350px)]">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#ADD8E6] bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
                    <section.icon size={20} className="text-[#FFC0CB]" />
                  </div>
                  <h2>{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-3 text-sm text-[#A9A9A9]">
                      <span className="text-[#FFC0CB] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
              <h3 className="mb-3">Questions About Privacy?</h3>
              <p className="text-sm text-[#A9A9A9] mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact our
                Privacy Officer:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@lunaclinical.com.au" className="text-[#FFC0CB] hover:underline">
                    privacy@lunaclinical.com.au
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> 1800 LUNA CARE (1800 586 222)
                </p>
                <p>
                  <strong>Mail:</strong> Privacy Officer, Luna Clinical, Level 5, 123 Health Street, Sydney NSW
                  2000
                </p>
              </div>
            </div>

            {/* Compliance */}
            <div className="text-center py-6 border-t border-gray-200">
              <p className="text-xs text-[#A9A9A9]">
                Luna Clinical is committed to compliance with the Privacy Act 1988 (Cth), Australian Privacy
                Principles, and all applicable health privacy legislation.
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};