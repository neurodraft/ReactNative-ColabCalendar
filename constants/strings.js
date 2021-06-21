import LocalizedStrings from 'react-localization';

export default new LocalizedStrings({
    en: {
        // Generic
        genEdit: 'Edit',
        genDone: 'Done',
        genAccept: 'Accept',
        genReject: 'Reject',
        genCancel: 'Cancel',
        genRemove: 'Remove',
        genDelete: 'Delete',
        genNotes: 'Notes',
        genSave: 'Save',
        genYes: 'Yes',
        genYesSave: 'Yes, save',
        genNo: 'No',
        genContinue: 'Continue',
        genFinish: 'Finish',
        genOops: 'Oops',
        genError: 'Error',
        genClose: 'Close',
        genServerError: 'There\'s an internal server error',
        genTimeoutError: 'Couldn\'t complete your request, check your internet connection or contact the customer support',
        genDate: 'Date',
        genHighest: 'Highest price',
        genLowest: 'Lowest price',
        genNameLable: 'Name',
        genUnitPriceLable: 'Unit price',
        genQuantityLable: 'Quantity',
        genCopy: 'Copy',
        deleted : 'successfully deleted',
        edited : 'successfully edited',
        warning : 'Warnign',
        isDelete : 'Do you really want to delete it?',
        genRemindMe: 'Remind me',
        genSetTime: 'Set time',
        genOnTime: 'On time',
        gen5min: '5 Minutes Before',
        gen15min: '15 Minutes Before',
        gen30min: '30 Minutes Before',
        

        // Login
        logLogin: 'Login',
        logEmail: 'Email',
        logEmailLabel: 'Email...',
        logPassword: 'Password',
        logPasswordLabel: 'Password...',
        logVerifyPasswordLabel:'Verify password...',
        logEmailPlaceholder: 'usersemail@email.com',
        logLoginButton: 'Log in',
        logSignUp: 'Sign up',
        logLogOut: 'Logout',
        logLogOutButton: 'Log Out',

        // Sign Up Screen Error Messages
        suEmptyFields: 'Fields cannot be left blank',
        suPasswordsNoMatch: 'Passwords do not match',

        // Settings
        setSettingsScreen: 'Settings Screen',


        // Home
        hoCalendar: 'Calendar',
        hoSettings: 'Settings',
        hoNofitications: 'Notifications',

        // Events
        evEvents: 'Events',
        evNewEvent: 'New Event',
        evEditEvent: 'Edit Event',
        evEventTitle: 'Event Title',
        evEventDesc: 'Event Description',
        evCreateEvent: 'Create Event',
        evNoTitle: 'The event must have a title.',
        evEventDate: 'Event Date',
        selectCal: 'Select a destination calendar.',
        evDaysEvents: "Day's Events",
        evCopy: 'Copy Event',

        // Calendars
        calNewCalendar : 'New Calendar',
        calCalendarTitle: 'Calendar Title',
        calCalendarDesc: 'Calendar Description',
        calNoCalendarFound: 'No calendars found...',
        calSelectCalendar: 'Select a calendar',

        // Errors
        errEmail: 'Invalid email',
        errPassword: 'Invalid password',
        errEmptyName: 'Please insert a name',
        errEmptyEstablishmentName: 'Please insert an establishment name',
        errEmptyEmail: 'Please insert an email',
        errEmptyAddress: 'Please insert an address',
        errEmptyUnitPrice: 'Insert a valid price',
        errEmptyQuantity: 'Insert a valid quantity',
        errInvalidEmail: 'Insert a valid email.',
        errEmptyClient: 'Insert a client.',
        errEmptyBasket: 'Insert items in the basket.',

        // Utils
        utiEdit: "Edit",
        utiConfirmTitle: "Confirm Delete",
        utiConfirmMessage: "Are you sure about that?",
        utiYes: "Yes",
        utiNo: "No",
        utiSearch: "Search",
        utiConfirm: "Confirm",
        utiCreateNew: "Create New",
        utiEditCalendar: "Edit Calendar",

        // Roles
        roCollab: "Collaborator",
        roView: "Viewer",

        // Invite Roles
        invCollab: "Collaborate",
        invView: "View",

        // Months
        months : [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],

        // Week Days
        weekDays : [
            "Sun", 
            "Mon", 
            "Tue", 
            "Wed", 
            "Thu", 
            "Fri", 
            "Sat"
        ],


        emptyResults : 'No results found...'
    },

    pt: {
        // Generic
        genEdit: 'Editar',
        genDone: 'Concluir',
        genAccept: 'Aceitar',
        genReject: 'Rejeitar',
        genCancel: 'Cancelar',
        genRemove: 'Remover',
        genDelete: 'Eliminar',
        genNotes: 'Notas',
        genSave: 'Guardar',
        genYes: 'Sim',
        genYesSave: 'Sim, gravar',
        genNo: 'Não',
        genContinue: 'Continuar',
        genFinish: 'Terminar',
        genOops: 'Oops',
        genError: 'Erro',
        genClose: 'Fechar',
        genServerError: 'Ocorreu um erro no servidor',
        genTimeoutError: 'Não foi possível concluir o seu pedido, verifique a sua ligação à internet ou contacte o suporte de cliente',
        genDate: 'Data',
        genHighest: 'Preço mais alto',
        genLowest: 'Preço mais baixo',
        genNameLable: 'Nome',
        genUnitPriceLable: 'Preço unitário',
        genQuantityLable: 'Quantidade',
        genCopy: 'Copiar',
        warning : 'Aviso',
        isDelete : 'Realmente deseja exclui-lo?',
        genRemindMe: 'Relembrar-me',
        genSetTime: 'Definir tempo',
        genOnTime: 'Na hora',
        gen5min: '5 Minutos Antes',
        gen15min: '15 Minutos Antes',
        gen30min: '30 Minutes Antes',

        // Login
        logLogin: 'Entrar',
        logEmail: 'Email',
        logEmailLabel: 'Email...',
        logPassword: 'Palavra-passe',
        logPasswordLabel: 'Password...',
        logVerifyPasswordLabel:'Verificar password...',
        lgEmailPlaceholder: 'usersemail@email.com',
        logLoginButton: 'Entrar',
        logSignUp: 'Registar',
        logLogOut: 'Sair',
        logLogOutButton: 'Sair',

        // Sign Up Screen Error Messages
        suEmptyFields: 'Campos em branco',
        suPasswordsNoMatch: 'A confirmação da senha não corresponde',

        // Settings
        setSettingsScreen: 'Menu de opções',

        // Home
        hoCalendar: 'Calendário',
        hoSettings: 'Definições',
        hoNofitications: 'Notificações',

        // Calendars
        calNewCalendar : 'Novo calendário',
        calendarTitle: 'Título do calendário',
        calendarDesc: 'Descrição do calendário',
        calNoCalendarFound: 'Não foram encontrados calendários',
        calSelectCalendar: 'Selecione um calendário',

        // Errors
        errEmail: 'Email inválido',
        errPassword: 'Palavra-passe inválida',
        errEmptyName: 'Introduza um nome',
        errEmptyEstablishmentName: 'Introduza um nome de estabelecimento',
        errEmptyEmail: 'Introduza um email',
        errEmptyAddress: 'Introduza um endereço',
        errEmptyUnitPrice: 'Introduza um preço válido',
        errEmptyQuantity: 'Introduza uma quantidade válida',
        errInvalidEmail: 'Introduza um email válido.',
        errEmptyClient: 'Introduza um cliente.',
        errEmptyBasket: 'Introduza produtos no carrinho.',

        // Utils
        utiEdit: "Modificar",
        utiConfirmTitle: "Confirmar Eliminar",
        utiConfirmMessage: "Tem a certeza do que está a fazer?",
        utiYes: "Sim",
        utiNo: "Não",
        utiSearch: "Procura",
        utiConfirm: "Confirmar",
        utiCreateNew: "Criar Novo",
        utiEditCalendar: "Editar Calendário",

        // Events
        evEvents: 'Events',
        evNewEvent: 'Novo Evento',
        evEditEvent: 'Editar evento',
        evEventTitle: 'Título do evento',
        evEventDesc: 'Descrição do evento',
        evCreateEvent: 'Criar Evento',
        evNoTitle: 'O evento tem de ter um título.',
        evEventDate: 'Data do evento',
        selectCal: 'Selecione o calendário destino.',
        evDaysEvents: "Eventos do Dia",
        evCopy: 'Copiar evento',

        // Roles
        roCollab: "Colaborador",
        roView: "Visualizador",

        // Invite Roles
        invCollab: "Colaborar",
        invView: "Visualizar",

        // Months
        months : [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ],

        // Week Days
        weekDays : [
            "Dom", 
            "Seg", 
            "Ter", 
            "Qua", 
            "Qui", 
            "Sex", 
            "Sab"
        ],

        

        deleted : 'Deletado com successo',
        edited : 'Editado com sucesso',
        emptyResults : 'Nenhum resultado encontrado...',
        calDel : 'Deletar calendar',
        selectCal: 'Selecione um calendario destino.',

        calNewCalendar : 'Adicionar calendário'
    },
})