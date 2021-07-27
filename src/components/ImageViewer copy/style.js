export default {
    imageViewer: {
        position: 'fixed',
        zIndex: 99999999999,
        width: '100%',
        height: '100%',
        left: 0,
        top: 0
    },
    mask: {
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    },
    index: {
        position: 'absolute',
        left: '50%',
        width: '100px',
        textAlign: 'center',
        color: '#ffffff80',
        marginTop: '20px',
        marginLeft: '-50px',
        zIndex: '999',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        right: '-50px',
        top: '-50px',
        width: '100px',
        height: '100px',
        background: '#00000095',
        borderRadius: '50%',
        lineHeight: '50px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    closeImg: {
        position: 'absolute',
        bottom: '20px',
        left: '20px'
    },
    tools: {
        position: 'absolute',
        display: 'flex',
        width: '193px',
        margin: '0 auto',
        bottom: '30px',
        left: '50%',
        marginLeft: '-82px'
    }
}