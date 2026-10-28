(function(){
const reportsAPI = window.childShildSupabase;

const reportForm = document.getElementById("reportForm");

if (reportForm) {
    reportForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const reportName =
            document.getElementById("reportName").value.trim();

        const reportEmail =
            document.getElementById("reportEmail").value.trim();

        const concern =
            document.getElementById("concern").value;

        const description =
            document.getElementById("description").value.trim();

        if (!reportsAPI || !reportsAPI.auth) {
            alert("Database connection is not configured. Please add your credentials in Backend/supabase.js.");
            return;
        }

        try {
            // Check login status
            const {
                data: { user },
                error: userError
            } = await reportsAPI.auth.getUser();

            if (userError || !user) {
                alert("Please log in before submitting your report.");
                return;
            }

            // Save the report in Supabase
            const { error } = await reportsAPI
                .from("reports")
                .insert({
                    user_id: user.id,
                    title: reportName,
                    reporter_email: reportEmail,
                    category: concern,
                    description: description
                });

            if (error) {
                console.error("Report error:", error);
                alert("Report submission failed: " + error.message);
                return;
            }

            alert("Your report has been submitted successfully!");
            reportForm.reset();
        } catch (err) {
            console.error("Submission exception:", err);
            alert("An error occurred while submitting: " + err.message);
        }
    });
}
})();