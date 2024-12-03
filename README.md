# Project: Scoreboard-App

![Scoreboard-App Image](https://learnwithsumit.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2-scoreboard.d3d1fe91.jpg&w=1920&q=75)

## Features:

1. **Add New Match:** Clicking the "Add Another Match" button creates a new match with an initial score of 0. Each match has a delete icon, increment & decrement input fields, and a total score. Matches manage their state independently.
2. **Initial State:** A single match is initialized with a score of 0.
3. **Increment/Decrement with Enter:** The match score updates based on the increment or decrement field values upon pressing Enter on the keyboard.
4. **Non-Negative Total:** The total score never goes below zero, even if decrement input exceeds the current total.
5. **Reset Button:** Clicking the reset button resets all match scores to 0 while retaining the number of matches.

---

# Project: FlightBooking-App

![FlightBooking-App Image](https://learnwithsumit.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F3-flight-booking.bbe3f29b.jpg&w=1920&q=75)

## Features:

1. **React-Redux Implementation:** The app is built using React-Redux.
2. **Booking Form:** Booking details (From, To, Date, Guests, Class) are saved to Redux store upon clicking "Book."
3. **Data Display:** Data from Redux store is displayed in a table format.
4. **Maximum Records Validation:** A maximum of three bookings can be added; the "Book" button is disabled after the limit.
5. **Delete Functionality:** Rows can be deleted, and the corresponding data is removed from the Redux store.

---

# Project: ProductCart-App

![ProductCart-App Image](https://learnwithsumit.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F8-product-cart.f8669ccb.jpg&w=1920&q=75)

## Features:

1. **Initial State:** No products are shown on first load; displays a "No Product Found" message if empty.
2. **Add Product:** New products added via form are saved to Redux store and displayed in the grid view.
3. **Stock Validation:** Quantity limits ensure the cart does not exceed stock availability.
4. **Dynamic Cart Updates:** Clicking "Add to Cart" adjusts the product's remaining quantity and disables the button when stock is depleted.
5. **Cart Details:** The cart icon shows the total number of added items. Clicking it navigates to a detailed cart page with billing details.
6. **Quantity Controls:** Each product has plus and minus buttons for quantity adjustment.
7. **Price Calculation:** Displays per-product total price and updates billing details dynamically.
8. **Delete Functionality:** Products can be removed entirely from the cart.

---

# Project: BookStore-App

![BookStore-App Image](https://learnwithsumit.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4-manage-bookstore.5d218b89.jpg&w=1920&q=75)

## Features:

1. **Book Submission:** Books are asynchronously stored on the server via the form.
2. **Book List:** Displays books fetched from the server.
3. **Filter Tags:** Filters books by "All" or "Featured."
4. **Search Functionality:** Search bar filters books by name dynamically.
5. **Edit and Update:** Books can be edited; updates are saved to the server.
6. **Delete Books:** Deletes books from both the UI and database.

---

# Project: RTKPlayground-App

![RTKPlayground-App Placeholder](#)

## Features:

1. **Redux Toolkit Usage:** Built entirely with Redux Toolkit.
2. **Async Thunk Fetch:** Fetch objects from API and perform sequential requests for related data using tags.
3. **Object Sorting:** Sort objects by views and log them in descending order.
4. **Redux Logger:** Middleware logs all actions.
5. **Tag-Based Fetching:** Uses fetched tags to query related videos.

---

# Project: Blog-App

![Blog-App Image](https://learnwithsumit.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5-lws-blog.b8b009e6.jpg&w=1920&q=75)

## Features:

1. **Fetch Blogs:** Displays blogs fetched from a fake JSON server.
2. **Sorting:** Blogs can be sorted by "Newest" or "Most Liked."
3. **Likes Management:** Increment likes count and sync with the server.
4. **Saved Blogs:** Shows only saved blogs in a separate view.
5. **Details View:** Navigates to a detailed view of a blog post using react-router-dom.
6. **Related Blogs:** Displays blogs related by tags, excluding the current post.
7. **Save Functionality:** Enables bookmarking of blogs with a visual indicator.

---

# Project: JobFinder-App

![JobFinder-App Image](https://learnwithsumit.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F9-lwsjob-finder.9f11108e.jpg&w=1920&q=75)

## Features:

1. **Job Listing:** Displays jobs fetched from JSON server with category-based color coding.
2. **Add Job:** Redirects to a "Create" page to add new jobs, saved in Redux store.
3. **Filter Jobs:** Filters jobs by category (Internship, Full Time, Remote).
4. **Edit Job:** Allows editing of job details and saves updates.
5. **Delete Job:** Deletes jobs from the list and Redux store.
6. **Search and Sort:** Enables search by title and sorting by salary on the client side.

---

# Project: BookStoreRTK-App

![BookStoreRTK-App Image](https://learnwithsumit.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4-manage-bookstore.5d218b89.jpg&w=1920&q=75)

## Features:

1. **RTK Query API Integration:** Fetches and displays books from the server.
2. **Add Books:** Uses mutation queries to save books to the server and redirects to the home page.
3. **Filtering:** Filters books by "All" or "Featured."
4. **Search Functionality:** Filters books by name using the search bar.
5. **Edit and Delete:** Allows editing and deletion of books with updates reflected on the server.

---

# Project: TaskManagerRTK-App

![TaskManagerRTK-App Image](https://imgur.com/ZdEcqUf)

## Features:

1. **Project and Team Display:** Fetches and displays projects and teams with color-coded checkboxes.
2. **Task Management:** Fetches tasks and displays them with project-specific styles.
3. **Filtered Tasks:** Displays tasks for selected projects only.
4. **Task Status Update:** Changes task status dynamically and syncs with the server.
5. **Delete Tasks:** Deletes tasks optimistically, with undo functionality on failure.
6. **Add and Edit Tasks:** Enables creating and editing tasks with server synchronization.
7. **Search Tasks:** Filters tasks by name or title via a search box.
