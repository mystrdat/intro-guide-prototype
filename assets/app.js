document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM ready');

  // Config
  var cfg = {
    scenes: {
      hello: false,
      role: false,
      roleInput: false,
      company: false,
      companyInput: false,
      intent: false,
      intentInput: false,
      tech: false,
      techInput: false
    },
    role: {
      options: ['Business Leader', 'Technology leader', 'Product leader']
    },
    company: {
      options: ['Fortune 1000', 'Mid Market Corp', 'Funded Startup']
    },
    intent: {
      options: ['App Developers', 'Build a New App', 'Update an Old App', 'Train My Team']
    },
    tech: {
      options: ['Javascript', 'React', 'Angular', 'Node']
    }
  };

  // Elements
  var elHello = document.getElementById('typed-hello'),
      elRole  = document.getElementById('typed-role');

  // GSAP setup
  var typedHello = new gsapTypeIt({
    el: elHello,
    cursorSign: ' _',
    rotateWords: true,
    autoPlay: false,
    delay: 0,
    duration: 1.5,
    rotateWordsOptions : {
      wordsList : ["Hello!", "Thanks for stopping by.", "You're viewing a general summary about what we do, but if you'd like something more personal then tell us a bit more about yourself."],
      cycle: false,
      append: true
    }
  });
  var typedRole = new gsapTypeIt({
    el: elRole,
    cursorSign: ' _',
    autoPlay: false,
    delay: 0,
    duration: 0.5,
    word: "I am a "
  });

  // Prepare the show
  var start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;

    // Hello intro
    if (progress > 0 && !cfg.scenes.hello) {
      console.log("running hello");
      cfg.scenes.hello = true;
      typedHello.type();
    }

    if (progress > 5000 && !cfg.scenes.role) {
      console.log("running role");
      cfg.scenes.role = true;
      typedRole.type();
    }

    console.log(progress);
    if (Object.values(cfg.scenes).some(function(val){return val === false})) {
      requestAnimationFrame(step);
    }
  }

  // Run the show
  requestAnimationFrame(step);

}, false);
