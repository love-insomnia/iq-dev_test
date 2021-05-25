$(document).ready(function () {

        let depositDate = $("input[type=text][name=depositDate]");
        let replenishmentSum = $("input[type=number][name=replenishmentSum]");
        let depositSum = $("input[type=number][name=depositSum]");

        depositDate.mask("99.99.9999");

        let sliderDepositSum = $("#deposit_sum");
        let sliderResDepositSum = $("#res_deposit_sum");

        let sliderReplenishmentSum = $("#replenishment_sum");
        let sliderResReplenishmentSum = $("#res_replenishment_sum");

        setRange(depositSum, sliderDepositSum, sliderResDepositSum);
        setRange(replenishmentSum, sliderReplenishmentSum, sliderResReplenishmentSum);


        function validateDate(value) {
            let depositDate = value.val().split(".");
            depositDate[1] -= 1;
            let date = new Date(depositDate[2], depositDate[1], depositDate[0]);
            console.log(date.getMonth());
            console.log(depositDate[1]);
            console.log(depositDate[2]);
            if ((date.getFullYear() == depositDate[2]) && (date.getMonth() == depositDate[1]) && (date.getDate() == depositDate[0])) {
                return false;
            } else {
                return true;
            }
        }


        function setRange(selector, selectorSlider, selectorRes) {
            selector.keyup(() => {
                selector.val() >= 3000000 ? selector.val(3000000) : selector.val();
            });

            selector.blur(() => {
                selector.val() < 1000 ? selector.val(1000) : selector.val();
                selectorSlider.slider({value: selector.val()})
                selectorRes.html(selector.val() + " руб")
            })
        }

        $(".slider").slider({
            animate: true,
            range: "min",
            value: 1000,
            min: 1000,
            max: 3000000,
            step: 1,
        });


        addSlider(sliderDepositSum, sliderResDepositSum, depositSum);
        addSlider(sliderReplenishmentSum, sliderResReplenishmentSum, replenishmentSum);

        function addSlider(selectorSlider, selectorRes, selectorInput) {

            selectorSlider.slider({value: selectorInput.val()})

            selectorSlider.slider({
                slide: function (event, ui) {
                    selectorRes.html(ui.value + " руб");
                },
                change: function (event, ui) {
                    selectorInput.val(ui.value);
                }
            });
        }

        $('form').submit(function (event) {
            event.preventDefault();
            $('.error').remove();

            if (depositDate.val() == '' || replenishmentSum.val() == '' || depositSum.val() == '') {
                $('#result').after('<span class="error">Заполните все поля!</span>');
            } else if (validateDate(depositDate)) {
                depositDate.after('<span class="error" style="margin-left: 10px">Неверна указана дата!</span>');
            } else {
                $.ajax({
                    type: "POST",
                    url: 'calc.php',
                    data: $(this).serialize(),
                    success: function (response) {
                        let jsonData = JSON.parse(response);
                        document.querySelector("#result").innerText = jsonData + " руб";
                    }
                });

            }
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

    }
)
