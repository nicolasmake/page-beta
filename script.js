// Smooth scrolling for anchor links
function scrollToOffer() {
  document.getElementById("comparison").scrollIntoView({
    behavior: "smooth",
  })
}

// FAQ Toggle functionality
function toggleFAQ(button) {
  const faqItem = button.parentElement
  const answer = faqItem.querySelector(".faq-answer")
  const icon = button.querySelector(".faq-icon")

  // Close all other FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (item !== faqItem) {
      item.classList.remove("active")
      item.querySelector(".faq-answer").classList.remove("active")
    }
  })

  // Toggle current FAQ item
  faqItem.classList.toggle("active")
  answer.classList.toggle("active")
}

function initializeStepInteractions() {
  const steps = document.querySelectorAll(".step")
  let currentStep = 0
  let stepInterval

  // Auto-cycle through steps
  function cycleSteps() {
    // Remove active class from all steps
    steps.forEach((step) => step.classList.remove("active"))

    // Add active class to current step
    if (steps[currentStep]) {
      steps[currentStep].classList.add("active")
    }

    // Move to next step
    currentStep = (currentStep + 1) % steps.length
  }

  // Start auto-cycling
  function startStepCycle() {
    stepInterval = setInterval(cycleSteps, 2500)
  }

  // Stop auto-cycling
  function stopStepCycle() {
    clearInterval(stepInterval)
  }

  // Add hover interactions
  steps.forEach((step, index) => {
    step.addEventListener("mouseenter", () => {
      stopStepCycle()
      steps.forEach((s) => s.classList.remove("active"))
      step.classList.add("active")
    })

    step.addEventListener("mouseleave", () => {
      step.classList.remove("active")
      startStepCycle()
    })

    step.addEventListener("click", () => {
      stopStepCycle()
      steps.forEach((s) => s.classList.remove("active"))
      step.classList.add("active")
      currentStep = index

      // Restart cycle after 3 seconds
      setTimeout(() => {
        startStepCycle()
      }, 3000)
    })
  })

  // Initialize first step and start cycling
  if (steps.length > 0) {
    steps[0].classList.add("active")
    startStepCycle()
  }

  // Pause cycling when section is not visible
  const stepsContainer = document.getElementById("steps-container")
  if (stepsContainer) {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startStepCycle()
          } else {
            stopStepCycle()
          }
        })
      },
      { threshold: 0.5 },
    )

    stepObserver.observe(stepsContainer)
  }
}

// Add smooth hover effects to benefit items
document.addEventListener("DOMContentLoaded", () => {
  initializeStepInteractions()

  const benefitItems = document.querySelectorAll(".benefit-item")

  benefitItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Add click tracking for CTA buttons
  const ctaButtons = document.querySelectorAll(".cta-button")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("[v0] CTA button clicked:", this.textContent)
      // Here you would typically send analytics or redirect to signup
    })
  })

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  }, observerOptions)

  // Observe sections for scroll animations
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  })

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroSection = document.querySelector(".hero")

    if (heroSection) {
      const heroHeight = heroSection.offsetHeight
      const scrollPercent = scrolled / heroHeight

      // Apply parallax effect to pseudo-elements via CSS custom properties
      heroSection.style.setProperty("--scroll-offset", `${scrollPercent * 50}px`)
    }
  })

  function initializeComparisonInteraction() {
    const bestChoiceCard = document.getElementById("best-choice")
    const badChoiceCards = document.querySelectorAll(".comparison-card:not(#best-choice)")

    if (bestChoiceCard) {
      // Add hover effect that reveals savings counter
      bestChoiceCard.addEventListener("mouseenter", () => {
        const savingsCounter = bestChoiceCard.querySelector(".savings-counter")
        if (savingsCounter) {
          savingsCounter.style.opacity = "1"
          savingsCounter.style.transform = "translateY(0)"

          // Animate the counter from 0 to final value
          let currentValue = 0
          const targetValue = 5880
          const increment = targetValue / 30

          const counterAnimation = setInterval(() => {
            currentValue += increment
            if (currentValue >= targetValue) {
              currentValue = targetValue
              clearInterval(counterAnimation)
            }
            savingsCounter.querySelector(".counter-value").textContent =
              `R$ ${Math.floor(currentValue).toLocaleString()}`
          }, 50)
        }
      })

      bestChoiceCard.addEventListener("mouseleave", () => {
        const savingsCounter = bestChoiceCard.querySelector(".savings-counter")
        if (savingsCounter) {
          savingsCounter.style.opacity = "0"
          savingsCounter.style.transform = "translateY(10px)"
        }
      })
    }

    // Add subtle shake effect to bad choice cards on hover
    badChoiceCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.animation = "subtle-shake 0.5s ease-in-out"
      })

      card.addEventListener("mouseleave", () => {
        card.style.animation = "none"
      })
    })
  }

  initializeComparisonInteraction()

  // Add scroll-to-top button when scrolling down
  window.addEventListener("scroll", () => {
    const scrollButton = document.getElementById("scroll-to-top")
    if (window.pageYOffset > 300) {
      if (scrollButton) {
        scrollButton.style.display = "block"
      }
    } else {
      if (scrollButton) {
        scrollButton.style.display = "none"
      }
    }
  })
})

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
  const nav = document.querySelector(".nav")
  nav.classList.toggle("mobile-active")
}

// Form validation (if forms are added later)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

