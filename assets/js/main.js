(function ($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// // Touch?
	// if (browser.mobile)
	// 	$body.addClass('is-touch');

	// Forms.
	var $form = $('form');

	// Auto-resizing textareas.
	$form.find('textarea').each(function () {

		var $this = $(this),
			$wrapper = $('<div class="textarea-wrapper"></div>'),
			$submits = $this.find('input[type="submit"]');

		$this
			.wrap($wrapper)
			.attr('rows', 1)
			.css('overflow', 'hidden')
			.css('resize', 'none')
			.on('keydown', function (event) {

				if (event.keyCode == 13
					&& event.ctrlKey) {

					event.preventDefault();
					event.stopPropagation();

					$(this).blur();

				}

			})
			.on('blur focus', function () {
				$this.val($.trim($this.val()));
			})
			.on('input blur focus --init', function () {

				$wrapper
					.css('height', $this.height());

				$this
					.css('height', 'auto')
					.css('height', $this.prop('scrollHeight') + 'px');

			})
			.on('keyup', function (event) {

				if (event.keyCode == 9)
					$this
						.select();

			})
			.triggerHandler('--init');

		// Fix.
		if (browser.name == 'ie'
			|| browser.mobile)
			$this
				.css('max-height', '10em')
				.css('overflow-y', 'auto');

	});

	// Menu.
	var $menu = $('#menu');

	$menu.wrapInner('<div class="inner"></div>');

	$menu._locked = false;

	$menu._lock = function () {

		if ($menu._locked)
			return false;

		$menu._locked = true;

		window.setTimeout(function () {
			$menu._locked = false;
		}, 350);

		return true;

	};

	$menu._show = function () {

		if ($menu._lock())
			$body.addClass('is-menu-visible');

	};

	$menu._hide = function () {

		if ($menu._lock())
			$body.removeClass('is-menu-visible');

	};

	$menu._toggle = function () {

		if ($menu._lock())
			$body.toggleClass('is-menu-visible');

	};

	$menu
		.appendTo($body)
		.on('click', function (event) {
			event.stopPropagation();
		})
		.on('click', 'a', function (event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$menu._hide();

			// Redirect.
			if (href == '#menu')
				return;

			window.setTimeout(function () {
				window.location.href = href;
			}, 350);

		})
		.append('<a class="close" href="#menu">Close</a>');

	$body
		.on('click', 'a[href="#menu"]', function (event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
			$menu._toggle();

		})
		.on('click', function (event) {

			// Hide.
			$menu._hide();

		})
		.on('keydown', function (event) {

			// Hide on escape.
			if (event.keyCode == 27)
				$menu._hide();

		});

})(jQuery);

//Mobile Overlay Behavior 


(document).ready(function () {
	// Track the state of the overlay
	var isOverlayActive = false;

	// Listen for touchstart event on '.tiles'
	$('.tiles').on('touchstart', function () {
		// Toggle the overlay based on its current state
		$(this).toggleClass('overlay', !isOverlayActive);
		isOverlayActive = !isOverlayActive;
	});

	// Listen for touchend event on the document
	$(document).on('touchend', function () {
		// Deactivate the overlay if it's active
		if (isOverlayActive) {
			$('.tiles.overlay').removeClass('overlay');
			isOverlayActive = false;
		}
	});
});


// $(document).ready(function () {
// 	// Track the state of the overlay
// 	var isOverlayActive = false;

// 	// Listen for touchstart event
// 	$('.tiles').on('touchstart', function () {
// 		// Check if the overlay is currently active
// 		if (!isOverlayActive) {
// 			$(this).addClass('overlay'); // Activate the overlay
// 			isOverlayActive = true; // Update the state
// 		} else {
// 			$(this).removeClass('overlay'); // Deactivate the overlay
// 			isOverlayActive = false; // Update the state
// 		}
// 	});

// 	// Listen for touchend event
// 	$(document).on('touchend', function () {
// 		// Deactivate the overlay regardless of its current state
// 		$(this).removeClass('overlay');
// 		isOverlayActive = false; // Reset the state
// 	});
// });

// $(document).ready(function () {
// 	$('.tiles img').on('touchstart touchend', function (e) {
// 		e.preventDefault(); // Prevents the default action of the event
// 		$(this).toggleClass('overlay');
// 	});
// });

// $(document).ready(function () {
// 	// Listen for touchstart event
// 	$('.tiles').on('touchstart', function () {
// 		$(this).addClass('overlay'); // Add class to simulate hover
// 	});

// 	// Listen for touchend event
// 	$('.tiles').on('touchend', function () {
// 		$(this).removeClass('overlay'); // Remove class to revert hover effect
// 	});
// });

// var overlays = document.querySelectorAll('.overlay');

// // Define the toggleOverlay function
// function toggleOverlay(event) {
// 	event.preventDefault(); // Prevents the default action of the event
// 	var overlay = event.currentTarget; // Gets the current target element
// 	overlay.classList.toggle('active'); // Toggles the 'active' class
// }

// // Attach touchstart and touchend event listeners to each overlay
// overlays.forEach(function (overlay) {
// 	overlay.addEventListener('touchstart', toggleOverlay, false);
// 	overlay.addEventListener('touchend', toggleOverlay, false);
// });