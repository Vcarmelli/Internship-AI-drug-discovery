$(document).ready(function() {
    if (window.location.pathname !== '/') {
        $('.nav-sections').addClass('hidden');
    }

    $('.tab-content:first').addClass('active');
});


// Create floating elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(element);
    }
}
createFloatingElements();



const optionsMap = {
    "DENV1SEQ03": ["1uzg", "3g7t", "3vtt", "7a3p", "7a3r"],
    "DENV1SEQ06": ["1uzg", "3g7t", "3vtt", "7a3p", "7a3r"],
    "DENV1SEQ08": ["1uzg", "3g7t", "3vtt", "7a3p", "7a3r"],
    "DENV2SEQ05": ["1oan", "1uzg", "3vtt", "7a3p", "7a3r"],
    "DENV2SEQ08": ["1oan", "1uzg", "3vtt", "7a3p", "7a3r"],
    "DENV2SEQ10": ["1oan", "1uzg", "3vtt", "7a3p", "7a3r"],
    "DENV3SEQ06": ["1uzg", "3vtt", "7a3p", "7a3r"],
    "DENV3SEQ09": ["1uzg", "3vtt", "7a3p", "7a3r"],
    "DENV3SEQ10": ["1uzg", "3vtt", "7a3p", "7a3r"],
    "DENV4SEQ01": ["1uzg", "3vtt", "3we1", "7a3p", "7a3r"],
    "DENV4SEQ09": ["1uzg", "3vtt", "3we1", "7a3p", "7a3r"],
    "DENV4SEQ10": ["1uzg", "3vtt", "3we1", "7a3p", "7a3r"]
};

function updatePDBDropdown(selectedSeq) {
    $("#pdb-dropdown").html('<option value="">Select PDB</option>');
    if (optionsMap[selectedSeq]) {
        optionsMap[selectedSeq].forEach(pdb => {
            $("#pdb-dropdown").append(
                $('<option>', {
                    value: `${selectedSeq}-docking-${pdb}.html`,
                    text: pdb.toUpperCase()
                })
            );
        });
        $("#pdb-dropdown").prop('disabled', false);
    } else {
        $("#pdb-dropdown").prop('disabled', true);

    }
    $("#result-frame").attr('src', '');
    $("#pdb-link").hide();
}

function loadIframe(filename) {
    if (!filename) {
        $("#result-frame").attr('src', '');
        $("#pdb-link").hide();
        return;
    }
    
    $("#result-frame").attr('src', '/docking/' + filename);

    const pdb = filename.match(/([a-z0-9]+)-docking-([a-z0-9]+)\.html$/i); 
    const pdbID = pdb[2].toUpperCase();
    $("#pdb-link").attr('href', `https://www.rcsb.org/structure/${pdbID}`)
            .text(`View ${pdbID} on Protein Data Bank`)
            .show();

    showPeptideBtn(pdb[1]);
}


function showPeptideBtn(peptideID) {
    console.log("Peptide button shown:", peptideID);
    $('#peptide-btn').data('peptide-id', peptideID);
    $('#peptide-btn').addClass('visible');
    
}

$('#peptide-btn').click(function() {
    location.href = `/peptides/${$(this).data('peptide-id')}`;
});





$('#seq-dropdown').change(function() {
    updatePDBDropdown($(this).val());

    console.log("Selected sequence:", $(this).val());
});

$('#pdb-dropdown').change(function() {
    console.log("htmlFile:", $(this).val());
    loadIframe($(this).val());
});





$('.tab-button').click(function() {
    const targetTabId = $(this).data('tab'); 
    $('.tab-button').removeClass('active');
    $('.tab-content').removeClass('active');
    $(this).addClass('active');
    $('#' + targetTabId).addClass('active');
});