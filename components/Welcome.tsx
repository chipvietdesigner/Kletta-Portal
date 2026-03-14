import React, { useState } from 'react';
import { ArrowRight, DownloadSimple, CheckCircle, Play } from '@phosphor-icons/react';
import { WelcomeData, WelcomeSectionItem } from '../types';
import WelcomeDetailModal from './WelcomeDetailModal';

const MOCK_WELCOME_DATA: WelcomeData = {
  sections: {
    get_started: [
      {
        title: "Welcome to Kletta",
        description: "Welcome message from CEO Matti Lannetta.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        modalSubtitle: "Start here if you’re new to the portal.",
        longDescription: "This overview video covers the essentials of managing your sole trader clients in Kletta. Learn how to navigate the dashboard, manage clients, and access support resources.",
        items: ["Dashboard navigation walkthrough", "Client management basics", "Accessing support resources", "Setting up your accountant profile"]
      },
      {
        title: "Portal Guide",
        description: "Download the full accountant guide.",
        cta: "Download Guide",
        image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        modalSubtitle: "Comprehensive PDF Guide",
        longDescription: "The complete reference manual for accountants using the Kletta portal. This guide includes detailed instructions for all features and best practices.",
        items: ["Detailed feature breakdown", "Troubleshooting tips", "Best practices for client onboarding", "Reporting workflows"]
      },
      {
        title: "Portal Walkthrough",
        description: "Overview of the Accountant Portal interface and features.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        modalSubtitle: "Interactive Tour",
        longDescription: "Take a guided tour through the main sections of the Accountant Portal to familiarize yourself with the interface and key capabilities.",
        items: ["Dashboard KPIs and charts", "Income & Expense tracking", "Generating tax reports", "Settings & Configuration"]
      },
      {
        title: "Invite Your First Client",
        description: "Guide to inviting a test sole trader account.",
        cta: "View steps",
        image_url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        modalSubtitle: "Step-by-step Instructions",
        longDescription: "Follow these simple steps to invite your first sole trader client to Kletta. You can also invite a test email address to try the flow yourself.",
        items: ["Go to 'All Clients' page from the sidebar", "Click the 'Invite client' button", "Fill in the client's email and name", "Send the invite and track status in the client list"]
      }
    ],
    quick_start: [
      {
        title: "A day in the life of a sole trader",
        description: "See how a typical sole trader uses the Kletta mobile app.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
        gallery_images: [
            "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=400"
        ],
        longDescription: "See how a typical sole trader uses the Kletta mobile app to manage their daily business finances effortlessly.",
        items: ["Receipt scanning workflow", "Mileage tracking on the go", "Categorizing transactions", "Chatting with the accountant"]
      },
      {
        title: "Sending invitations",
        description: "Guide for sending invitations individually or in bulk.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
        longDescription: "Learn the different ways to onboard your clients to Kletta efficiently, whether one by one or in bulk.",
        items: ["Single client invitation", "Bulk CSV import", "Tracking invitation status", "Resending expired invites"]
      },
      {
        title: "Mobile app overview",
        description: "Overview of receipts, mileage, invoices, chat.",
        cta: "View details",
        image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
        gallery_images: [
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=400"
        ],
        longDescription: "A complete overview of the features available to your clients in the Kletta mobile app.",
        items: ["Home screen dashboard", "Camera for receipts", "Invoicing tool", "Real-time chat support"]
      }
    ],
    resources: [
      {
        title: "Templates & documents",
        items: [
          "Invite letter",
          "CSV import template",
          "Quick-start PDF"
        ],
        cta: "Download assets"
      },
      {
        title: "Support Materials",
        items: [
          "In-app chat walkthrough",
          "Backfilling YTD",
          "Remote login"
        ],
        cta: "View details"
      },
      {
        title: "Community & Support",
        items: [
          "Join Kletta community",
          "Weekly Meet & Greet Webinar",
          "Contact support"
        ],
        cta: "Open resources"
      }
    ],
    support: [
      {
        title: "1:1 Support & Webinars",
        description: "Book meetings with Kevin, join weekly Meet & Greet webinars, or contact support@kletta.com.",
        cta: "Schedule meeting",
        secondary_cta: "Join Webinar",
        image_url: "https://images.unsplash.com/photo-1515168816537-bf4980658842?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Partner Success Resources",
        description: "Access enablement packs, guides, templates, and support materials for partner success.",
        cta: "Open resources",
        image_url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
      }
    ],
    community: [
      {
        title: "Kletta For Accountants Community Forum",
        description: "A community forum inside the portal, where partners can share ideas and best practice.",
        cta: "Learn more",
        image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400"
      }
    ],
    newsletter: [
      {
        title: "Partner Newsletter",
        description: "Receive shared insights, news, and product updates from Kletta.",
        cta: "Subscribe",
        image_url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400"
      }
    ]
  }
};

const Welcome: React.FC = () => {
  const { sections } = MOCK_WELCOME_DATA;
  const [selectedItem, setSelectedItem] = useState<WelcomeSectionItem | null>(null);

  return (
    <>
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-8">
        <div className="max-w-[1200px] mx-auto space-y-12">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-[#002b31] mb-2">Welcome to Kletta</h1>
            <p className="text-[13px] text-gray-500">Everything you need to get started and support your clients.</p>
          </div>

          {/* SECTION A: Let's Get Started */}
          <div>
            <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sections.get_started.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow group">
                  <div className="w-full aspect-[16/10] bg-gray-100 rounded-lg mb-4 overflow-hidden relative border border-gray-100">
                     <img 
                       src={item.image_url} 
                       alt={item.title} 
                       loading="lazy"
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                     {item.video_url && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md backdrop-blur-sm">
                             <Play size={16} weight="fill" className="text-[#002b31] ml-0.5" />
                          </div>
                       </div>
                     )}
                  </div>
                  <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                  <p className="text-[12px] text-gray-500 mb-4 flex-1 leading-relaxed">{item.description}</p>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="w-full h-[36px] bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    {item.cta}
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION B: Quick Start Tutorials */}
          <div>
            <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Quick Start Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.quick_start.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow group">
                  <div className="w-full aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden border border-gray-100">
                     <img 
                       src={item.image_url} 
                       alt={item.title} 
                       loading="lazy"
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                  </div>
                  <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                  <p className="text-[12px] text-gray-500 mb-4 flex-1 leading-relaxed">{item.description}</p>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="w-full h-[36px] bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    {item.cta}
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION C: Explore Resources */}
          <div>
            <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Explore Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.resources.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow">
                  <h3 className="text-[14px] font-bold text-[#002b31] mb-4">{item.title}</h3>
                  <div className="flex-1 space-y-3 mb-6">
                    {item.items?.map((subItem, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-[13px] text-gray-600">
                        <CheckCircle size={16} className="text-gray-300 flex-shrink-0" />
                        <span>{subItem}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full h-[36px] bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2">
                    {item.cta}
                    <DownloadSimple size={14} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION D: Further Support */}
          <div>
            <h2 className="text-[16px] font-bold text-[#002b31] mb-6 border-b border-gray-200 pb-2">Further Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.support.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  <div className="w-full md:w-1/3 flex-shrink-0">
                     <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={item.image_url} alt="" loading="lazy" className="w-full h-full object-cover" />
                     </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                    <p className="text-[13px] text-gray-600 mb-6 flex-1 leading-relaxed">{item.description}</p>
                    <div className="flex gap-3">
                      <button className="flex-1 h-[36px] bg-[#002b31] hover:bg-[#003840] text-white text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                        {item.cta}
                      </button>
                      {item.secondary_cta && (
                        <button className="flex-1 h-[36px] bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                          {item.secondary_cta}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION E & F: Community & Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Community */}
            {sections.community.map((item, idx) => (
              <div key={idx} className="bg-[#002b31] text-white border border-[#002b31] rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
                 <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-[13px] text-gray-300 mb-6 leading-relaxed">{item.description}</p>
                    <button className="h-[36px] px-6 bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                      {item.cta}
                    </button>
                 </div>
                 <div className="w-full md:w-1/3 flex-shrink-0 hidden md:flex items-center justify-center bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                    <img src={item.image_url} alt="" loading="lazy" className="w-full h-full object-cover opacity-80" />
                 </div>
              </div>
            ))}

            {/* Newsletter */}
            {sections.newsletter.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
                 <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-[#002b31] mb-2">{item.title}</h3>
                    <p className="text-[13px] text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                    <button className="h-[36px] px-6 bg-white border border-gray-200 hover:bg-gray-50 text-[#002b31] text-[12px] font-bold rounded-lg transition-colors shadow-sm">
                      {item.cta}
                    </button>
                 </div>
                 <div className="w-full md:w-1/3 flex-shrink-0 hidden md:flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <img src={item.image_url} alt="" loading="lazy" className="w-full h-full object-cover" />
                 </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Detail Modal */}
      <WelcomeDetailModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        item={selectedItem} 
      />
    </>
  );
};

export default Welcome;