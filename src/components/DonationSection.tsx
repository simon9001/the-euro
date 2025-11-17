// src/components/DonationSection.tsx
import { useState } from 'react'
import { type DonationOption } from '../types'

const donationOptions: DonationOption[] = [
  {
    id: 1,
    title: "Support for Her Children",
    description: "Contribute to the education and welfare of Betty's two children. Your donation will help secure their future education and provide ongoing support for their wellbeing.",
    icon: "👨‍👩‍👧‍👦",
    impact: "Education fund, healthcare, and daily needs",
    suggestedAmounts: [1000, 5000, 10000, 25000]
  },
  {
    id: 2,
    title: "Leukemia Awareness",
    description: "Support research and awareness for leukemia treatment in Kenya. Help fund medical research, patient support programs, and early detection initiatives.",
    icon: "🎗️",
    impact: "Medical research, patient support, awareness campaigns",
    suggestedAmounts: [500, 2000, 5000, 10000]
  },
  {
    id: 3,
    title: "Gospel Music Foundation",
    description: "Help establish a foundation to support upcoming gospel artists. This foundation will provide mentorship, recording opportunities, and financial support for aspiring musicians.",
    icon: "🎵",
    impact: "Artist development, recording grants, mentorship programs",
    suggestedAmounts: [1500, 3000, 7500, 15000]
  },
  {
    id: 4,
    title: "Community Outreach",
    description: "Support community programs that Betty was passionate about, including church initiatives and youth empowerment projects in her hometown.",
    icon: "🤝",
    impact: "Community programs, youth empowerment, church support",
    suggestedAmounts: [1000, 2500, 5000, 10000]
  },
  {
    id: 5,
    title: "Music Education Fund",
    description: "Provide music education scholarships for underprivileged children, continuing Betty's passion for nurturing young musical talent.",
    icon: "🎓",
    impact: "Scholarships, music instruments, training programs",
    suggestedAmounts: [2000, 5000, 10000, 20000]
  },
  {
    id: 6,
    title: "Healthcare Access",
    description: "Support healthcare initiatives for artists and creatives who lack medical insurance, addressing a cause close to Betty's heart.",
    icon: "🏥",
    impact: "Medical bills, health insurance, wellness programs",
    suggestedAmounts: [1500, 4000, 8000, 15000]
  }
]

interface DonationSectionProps {
  preview?: boolean;
}

export default function DonationSection({ preview = false }: DonationSectionProps) {
  const [selectedOption, setSelectedOption] = useState<DonationOption | null>(null)
  const [donationAmount, setDonationAmount] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false)

  const visibleOptions = preview ? donationOptions.slice(0, 3) : donationOptions

  const handleDonate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (selectedOption && donationAmount) {
      setIsSubmitting(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitting(false)
      setDonationSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setDonationAmount('')
        setSelectedOption(null)
        setDonationSuccess(false)
      }, 3000)
    }
  }

  const handleQuickAmount = (amount: number): void => {
    setDonationAmount(amount.toString())
  }

  const formatCurrency = (amount: number): string => {
    return `KSh ${amount.toLocaleString()}`
  }

  if (donationSuccess) {
    return (
      <section id="support" className="section-padding bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Thank You for Your Generosity!</h2>
            <p className="text-green-700 mb-6">
              Your donation of {formatCurrency(parseInt(donationAmount))} has been received. 
              You're helping to continue Betty's legacy and make a real difference.
            </p>
            <button 
              onClick={() => setDonationSuccess(false)}
              className="btn bg-green-600 text-white border-none hover:bg-green-700"
            >
              Make Another Donation
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="support" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Continue Her Legacy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your support helps carry forward Betty's mission of faith, hope, and love. 
            Choose a cause that resonates with you and make a meaningful contribution.
          </p>
        </div>

        {/* Impact Statistics */}
        {!preview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="stat bg-memorial-light rounded-lg text-center p-4">
              <div className="stat-value text-memorial-gold text-2xl">127+</div>
              <div className="stat-desc text-gray-600">Donors</div>
            </div>
            <div className="stat bg-memorial-light rounded-lg text-center p-4">
              <div className="stat-value text-memorial-gold text-2xl">KSh 2.4M</div>
              <div className="stat-desc text-gray-600">Raised</div>
            </div>
            <div className="stat bg-memorial-light rounded-lg text-center p-4">
              <div className="stat-value text-memorial-gold text-2xl">6</div>
              <div className="stat-desc text-gray-600">Causes</div>
            </div>
            <div className="stat bg-memorial-light rounded-lg text-center p-4">
              <div className="stat-value text-memorial-gold text-2xl">100%</div>
              <div className="stat-desc text-gray-600">Transparent</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleOptions.map((option) => (
            <div
              key={option.id}
              className={`card bg-base-100 shadow-lg cursor-pointer transition-all h-full ${
                selectedOption?.id === option.id 
                  ? 'ring-2 ring-memorial-gold scale-105 bg-memorial-light' 
                  : 'hover:shadow-xl hover:scale-105'
              }`}
              onClick={() => setSelectedOption(option)}
            >
              <div className="card-body text-center">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="card-title justify-center text-memorial-dark text-lg">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {preview 
                    ? `${option.description.substring(0, 80)}...`
                    : option.description
                  }
                </p>
                {!preview && (
                  <div className="mt-3">
                    <div className="badge badge-sm bg-memorial-gold text-memorial-dark">
                      Impact: {option.impact}
                    </div>
                  </div>
                )}
                {selectedOption?.id === option.id && (
                  <div className="mt-2">
                    <div className="badge badge-sm badge-primary">Selected</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show message if there are more options in full version */}
        {preview && donationOptions.length > 3 && (
          <div className="text-center mb-8">
            <div className="bg-memorial-light rounded-lg p-6">
              <p className="text-gray-600 mb-2">
                And {donationOptions.length - 3} more ways to support Betty's legacy
              </p>
              <button className="btn btn-outline border-memorial-gold text-memorial-gold hover:bg-memorial-gold hover:text-white">
                View All Causes
              </button>
            </div>
          </div>
        )}

        {/* Donation Form */}
        {selectedOption && (
          <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto animate-fade-in">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl">{selectedOption.icon}</div>
                <div>
                  <h3 className="card-title text-memorial-dark">
                    Support {selectedOption.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{selectedOption.impact}</p>
                </div>
              </div>
              
              <form onSubmit={handleDonate} className="space-y-6">
                {/* Suggested Amounts */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Quick Select Amount (KSh)</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {selectedOption.suggestedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleQuickAmount(amount)}
                        className={`btn btn-outline ${
                          donationAmount === amount.toString() 
                            ? 'bg-memorial-gold text-memorial-dark border-memorial-gold' 
                            : 'border-gray-300'
                        }`}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Or Enter Custom Amount</span>
                  </label>
                  <div className="join w-full">
                    <span className="join-item btn bg-gray-100 border-gray-300 pointer-events-none">
                      KSh
                    </span>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="input input-bordered join-item flex-1"
                      placeholder="Enter amount"
                      min="100"
                      required
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Payment Method</span>
                  </label>
                  <select className="select select-bordered">
                    <option>M-Pesa (Kenya)</option>
                    <option>Credit/Debit Card</option>
                    <option>PayPal</option>
                    <option>Bank Transfer</option>
                  </select>
                </div>

                {/* Donor Information */}
                {!preview && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input type="text" className="input input-bordered" placeholder="Your name" />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input type="email" className="input input-bordered" placeholder="your@email.com" />
                    </div>
                  </div>
                )}

                {/* Terms */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" className="checkbox checkbox-sm" required />
                    <span className="label-text">
                      I agree to the terms and conditions. All donations are secure and tax-deductible.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6">
                  <button 
                    type="submit" 
                    disabled={!donationAmount || isSubmitting}
                    className="btn bg-memorial-gold text-memorial-dark border-none hover:bg-yellow-400 text-lg py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Make Donation 🕯️
                        {donationAmount && ` - ${formatCurrency(parseInt(donationAmount))}`}
                      </>
                    )}
                  </button>
                </div>

                {/* Security Note */}
                <div className="text-center">
                  <p className="text-gray-500 text-sm">
                    🔒 Secure donation powered by trusted payment processors
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Additional Info for Full Page */}
        {!preview && !selectedOption && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div className="bg-memorial-light rounded-xl p-6">
              <h3 className="text-xl font-bold text-memorial-dark mb-4">Transparency Promise</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ 100% of donations go directly to the causes</li>
                <li>✅ Regular impact reports sent to all donors</li>
                <li>✅ Verified by independent auditors</li>
                <li>✅ Tax-deductible receipts provided</li>
              </ul>
            </div>
            <div className="bg-memorial-light rounded-xl p-6">
              <h3 className="text-xl font-bold text-memorial-dark mb-4">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                Have questions about donating or want to discuss other ways to support?
              </p>
              <button className="btn btn-outline border-memorial-gold text-memorial-gold hover:bg-memorial-gold hover:text-white">
                Contact Our Team
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}