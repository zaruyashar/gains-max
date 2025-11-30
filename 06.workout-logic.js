// event listener for PDF download
document.addEventListener("DOMContentLoaded", function () {
    const downloadButtons = document.querySelectorAll(".download-btn");

    downloadButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const elementToPrint = document.getElementById(targetId);

            const fileName = targetId.replace("plan-", "") + "-workout-plan.pdf";

            html2canvas(elementToPrint, { scale: 2 }).then(canvas => {

                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF("p", "mm", "a4");


                const imgData = canvas.toDataURL("image/png");
                const imgWidth = 210; // A4 width / mm
                const pageHeight = 297; // A4 height / mm
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                // add img to PDF
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                // add new page if the content is longer than 1 page
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                // download PDF
                pdf.save(fileName);
            });


            $(this).closest(".modal").modal("hide");
        });
    });
});