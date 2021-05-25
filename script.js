$(document).ready(function () {

    let depositDate = $("input[type=text][name=depositDate]");
    let replenishmentSum = $("input[type=number][name=replenishmentSum]");
    let depositSum = $("input[type=number][name=depositSum]");
    depositDate.mask("99.99.9999");
    
    setRange(depositSum);
    setRange(replenishmentSum);

    function setRange(selector) {
        selector.keyup(() => {
            selector.val() < 1000 ? selector.val(1000) : selector.val();
            selector.val() >= 3000000 ? selector.val(3000000) : selector.val()
        });
    }


    $('form').submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: 'calc.php',
            data: $(this).serialize(),
            success: function (response) {
                let jsonData = JSON.parse(response);
                document.querySelector("#result").innerText = jsonData + " руб";
            }
        });
    });


    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesShort: ['Воск', 'Пнд', 'Втор', 'Срд', 'Четв', 'Пятн', 'Субб'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    depositDate.datepicker();


    $(".slider").slider({
        animate: true,
        range: "min",
        value: 1000,
        min: 1000,
        max: 3000000,
        step: 1,
    });

    let sliderDepositSum = $("#deposit_sum");
    let sliderResDepositSum = $("#res_deposit_sum");

    let sliderReplenishmentSum = $("#replenishment_sum");
    let sliderResReplenishmentSum = $("#res_replenishment_sum");

    addSlider(sliderDepositSum,sliderResDepositSum,depositSum);
    addSlider(sliderReplenishmentSum,sliderResReplenishmentSum,replenishmentSum);

    function addSlider(selectorSlider,selectorRes,selectorInput) {
        selectorSlider.slider({
            slide: function (event, ui) {
                selectorRes.html(ui.value + " руб");
            },
            change: function (event, ui) {
                selectorInput.val(ui.value);
            }
        });
    }

})
