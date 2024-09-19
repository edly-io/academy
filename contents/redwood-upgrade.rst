.. raw:: html

    <div class="video"><iframe src="https://www.youtube-nocookie.com/embed/z1J5qgLuCF0?si=765FJPdIS5h8ycSZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>

Release notes:

* https://docs.openedx.org/en/latest/community/release_notes/redwood/feature_release_notes.html
* https://docs.openedx.org/en/latest/community/release_notes/redwood/dev_op_release_notes.html
* https://github.com/overhangio/tutor/blob/master/CHANGELOG.md

Backup::

	tutor local stop
	sudo rsync -avr ~/.local/share/tutor/ ~/.local/share/tutor.quince

Upgrade Tutor::

	pip install --upgrade 'tutor[full]'
	tutor --version
	tutor plugins list

Launch upgraded Open edX platform::

	tutor local launch.

If for some reasons the upgrade steps were skipped, run::

	tutor local upgrade --from=quince
