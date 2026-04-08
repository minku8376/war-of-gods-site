/**
 * site.js - 공개 사이트 프론트엔드 로직 (정적 버전)
 */

// ── 별 배경 생성 ──
function createStars() {
  const container = document.querySelector('.stars-container');
  if (!container) return;
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star' + (i % 15 === 0 ? ' gold' : '');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
    star.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(star);
  }
}

// ── 유성 생성 ──
function createMeteors() {
  for (let i = 0; i < 2; i++) {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    meteor.style.animationDelay = (i * 7 + Math.random() * 5) + 's';
    meteor.style.left = (60 + Math.random() * 40) + '%';
    document.body.appendChild(meteor);
  }
}

// ── 네비게이션 스크롤 하이라이트 ──
function setupNav() {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.id;
      links.forEach(link => {
        if (link.getAttribute('href') === '#' + id) {
          link.classList.toggle('active', scrollY >= top && scrollY < bottom);
        }
      });
    });
  });
}

// ── 등장인물 로드 (characters.json에서 읽기) ──
async function loadCharacters() {
  const grid = document.getElementById('characters-grid');
  if (!grid) return;

  try {
    const res = await fetch('/data/characters.json');
    if (!res.ok) throw new Error('No data');
    const characters = await res.json();

    grid.innerHTML = '';
    if (characters.length === 0) {
      grid.innerHTML = '<div class="no-characters">아직 등록된 캐릭터가 없습니다.</div>';
      return;
    }

    characters.forEach(char => {
      const card = document.createElement('div');
      card.className = 'character-card';
      card.innerHTML = `
        <img src="${char.imagePath}" alt="${char.nameKo}" loading="lazy" />
        <div class="character-info">
          <h3>${char.nameKo}</h3>
          <div class="char-sub">${char.nameEn || ''}</div>
          <div class="char-faction">${char.faction || ''}${char.deity ? ' · ' + char.deity : ''}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    grid.innerHTML = '<div class="no-characters">아직 등록된 캐릭터가 없습니다.</div>';
  }
}

// ── 초기화 ──
document.addEventListener('DOMContentLoaded', () => {
  createStars();
  createMeteors();
  setupNav();
  loadCharacters();
});
