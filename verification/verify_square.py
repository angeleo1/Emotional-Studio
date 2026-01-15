from playwright.sync_api import sync_playwright

def verify_booking_system():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a fixed viewport to ensure consistency
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # --- 1. Verify Direct Booking Pages first (Easier to debug) ---

        # Test /booking-backup
        print("Visiting /booking-backup...")
        page.goto("http://localhost:3001/booking-backup")
        page.wait_for_load_state("networkidle")

        # Check for the Square Iframe container or the placeholder message
        # The placeholder has "Square Booking Config Required" text if configured properly in my mock
        if page.get_by_text("Square Booking Config Required").is_visible():
            print("Confirmed Square placeholder on booking-backup")
        elif page.locator("iframe[title='Square Online Booking']").is_visible():
             print("Confirmed Square iframe on booking-backup")
        else:
            print("Warning: Square element not found immediately on booking-backup. Taking screenshot.")

        page.screenshot(path="verification/booking_backup.png")
        print("Screenshot saved: verification/booking_backup.png")

        # Test /mobile-booking
        print("Visiting /mobile-booking...")
        page.goto("http://localhost:3001/mobile-booking")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/mobile_booking.png")
        print("Screenshot saved: verification/mobile_booking.png")

        # --- 2. Verify Floating Button on Homepage ---
        print("Visiting homepage...")
        page.goto("http://localhost:3001")
        page.wait_for_load_state("networkidle")

        # Scroll down to trigger the button
        print("Scrolling...")
        page.evaluate("window.scrollTo(0, 1000)")
        page.wait_for_timeout(2000) # Wait for scroll event and animation

        # Try to find the button
        button = page.locator('button[aria-label="Book Now"]')
        if button.is_visible():
            print("Floating button found. Clicking...")
            button.click()

            # Wait for modal
            print("Waiting for modal...")
            page.wait_for_selector(".fixed.inset-0.z-50", state="visible", timeout=5000)
            page.wait_for_timeout(1000)

            page.screenshot(path="verification/homepage_modal.png")
            print("Screenshot saved: verification/homepage_modal.png")
        else:
            print("Floating button not found. It might require more scroll or content is too short.")
            page.screenshot(path="verification/homepage_no_button.png")

        browser.close()

if __name__ == "__main__":
    verify_booking_system()
