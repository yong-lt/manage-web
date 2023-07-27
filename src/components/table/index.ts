type DefaultOptButType = 'edit' | 'delete'

export const defaultOptButtons = (optButType: DefaultOptButType[] =  ['edit', 'delete']): OptButton[] => {
    const optButtonsPre: Map<string, OptButton> = new Map([
        [
            'edit',
            {   
                name: "edit",
                render: 'tipButton',
                title: "编辑",
                icon: "Edit" ,
                type: "primary"
            }
        ],
        [
            'delete',
            {   
                name: "delete",
                render: 'confirmButton',
                title: "删除",
                icon: "Delete" ,
                type: "danger",
                popconfirm: {
                    confirmButtonText: "删除",
                    cancelButtonText: "取消",
                    confirmButtonType: 'danger',
                    title: "是否删除选中项？",
                },
            }
        ]
    ])

    const optButtons: OptButton[] = []
    for (const key in optButType) {
        if (optButtonsPre.has(optButType[key])) {
            optButtons.push(optButtonsPre.get(optButType[key])!)
        }
    }
    return optButtons
}