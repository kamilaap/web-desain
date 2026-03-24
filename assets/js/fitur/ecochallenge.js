document.addEventListener('DOMContentLoaded', () => {
    const storageKey = 'ecoChallengeProgress';
    const checkboxes = document.querySelectorAll('.task-check');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    const taskCountText = document.getElementById('taskCount');
    const statusText = document.getElementById('statusText');
    const btnReset = document.getElementById('btnReset');
    const btnStart = document.getElementById('btnStart');
    const impactActions = document.getElementById('impactActions');
    const impactPlastic = document.getElementById('impactPlastic');
    const impactEnergy = document.getElementById('impactEnergy');
    const completionCard = document.getElementById('completionCard');
    const resetModalBackdrop = document.getElementById('resetModalBackdrop');
    const btnCancelReset = document.getElementById('btnCancelReset');
    const btnConfirmReset = document.getElementById('btnConfirmReset');

    const impactLookup = [
        { plastic: 0, energy: 1 },
        { plastic: 0, energy: 0 },
        { plastic: 0, energy: 1 },
        { plastic: 2, energy: 0 },
        { plastic: 1, energy: 0 },
        { plastic: 0, energy: 0 },
        { plastic: 1, energy: 0 }
    ];

    function saveProgress() {
        const values = Array.from(checkboxes).map((checkbox) => checkbox.checked);
        localStorage.setItem(storageKey, JSON.stringify(values));
    }

    function applyTaskState(checkbox) {
        const listItem = checkbox.closest('.list-item');
        const stepNumber = listItem.querySelector('.step-number');

        listItem.classList.toggle('is-complete', checkbox.checked);
        stepNumber.classList.toggle('num-active', checkbox.checked);
    }

    function loadProgress() {
        const saved = localStorage.getItem(storageKey);
        if (!saved) {
            return;
        }

        try {
            const values = JSON.parse(saved);
            checkboxes.forEach((checkbox, index) => {
                checkbox.checked = Boolean(values[index]);
                applyTaskState(checkbox);
            });
        } catch (error) {
            localStorage.removeItem(storageKey);
        }
    }

    function updateProgress() {
        const totalTasks = checkboxes.length;
        const completedTasks = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
        const impacts = Array.from(checkboxes).reduce((accumulator, checkbox, index) => {
            if (!checkbox.checked) {
                return accumulator;
            }

            accumulator.plastic += impactLookup[index].plastic;
            accumulator.energy += impactLookup[index].energy;
            return accumulator;
        }, { plastic: 0, energy: 0 });

        const percentage = Math.round((completedTasks / totalTasks) * 100);

        progressBar.style.width = `${percentage}%`;
        progressPercent.innerText = `${percentage}%`;
        taskCountText.innerText = completedTasks;
        impactActions.innerText = `${completedTasks} aksi`;
        impactPlastic.innerText = `${impacts.plastic} item`;
        impactEnergy.innerText = `${impacts.energy} kebiasaan`;

        if (percentage === 0) {
            statusText.innerText = 'Belum Dimulai';
            statusText.style.color = '';
        } else if (percentage < 100) {
            statusText.innerText = 'Sedang Berjalan';
            statusText.style.color = '';
        } else {
            statusText.innerText = 'Misi Selesai!';
            statusText.style.color = '#22c55e';
        }

        completionCard.hidden = percentage !== 100;
    }

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            applyTaskState(checkbox);
            saveProgress();
            updateProgress();
        });
    });

    function openResetModal() {
        resetModalBackdrop.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeResetModal() {
        resetModalBackdrop.hidden = true;
        document.body.style.overflow = '';
    }

    function resetProgress() {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
            applyTaskState(checkbox);
        });
        localStorage.removeItem(storageKey);
        updateProgress();
        closeResetModal();
    }

    btnReset.addEventListener('click', openResetModal);
    btnCancelReset.addEventListener('click', closeResetModal);
    btnConfirmReset.addEventListener('click', resetProgress);
    resetModalBackdrop.addEventListener('click', (event) => {
        if (event.target === resetModalBackdrop) {
            closeResetModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !resetModalBackdrop.hidden) {
            closeResetModal();
        }
    });

    const firstCard = document.querySelector('.glass-card');

    btnStart.addEventListener('click', () => {
        firstCard.scrollIntoView({
            behavior: 'smooth'
        });
    });

    loadProgress();
    updateProgress();
});
